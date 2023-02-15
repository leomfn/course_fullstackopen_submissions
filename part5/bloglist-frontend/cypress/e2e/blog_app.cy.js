describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const users = [
      {
        name: 'Max Mustermann',
        username: 'max_mustermann',
        password: 'testpassword'
      },
      {
        name: 'John Doe',
        username: 'john_doe',
        password: 'anotherpassword'
      }
    ]

    users.forEach(user => cy.request('POST', 'http://localhost:3003/api/users/', user))

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('login')

  })

  describe('Login', () => {
    // note: arrow functions are used because cypress documentation
    // also uses them. However, be careful when using 'this.*', see
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases

    it('succeeds with correct credentials', () => {
      cy.get('input[name="Username"]').type('max_mustermann')
      cy.get('input[name="Password"]').type('testpassword')
      cy.contains('login').click()

      cy.contains('Max Mustermann logged in')
      cy.contains('logout')
      cy.contains('blogs')
      cy.contains('new note')
    })

    it('fails with wrong credentials', () => {
      cy.get('input[name="Username"]').type('max_mustermann')
      cy.get('input[name="Password"]').type('wrongpassword')
      cy.contains('login').click()

      cy.contains('wrong username or password')
        .should('have.css', 'background-color', 'rgb(255, 0, 0)')
      cy.contains('logout').should('not.exist')
      cy.contains('blogs').should('not.exist')
      cy.contains('new note').should('not.exist')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request(
        'POST',
        'http://localhost:3003/api/login/',
        { username: 'max_mustermann', password: 'testpassword' })
        .then(response => {
          localStorage.setItem(
            'currentUser',
            JSON.stringify(response.body)
          )
          cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function () {
      const blog = {
        title: 'Test blog title',
        author: 'Blog Author',
        url: 'https://example.com/testblog'
      }
      cy.contains('new note').click()
      cy.get('input[name="Title"]').type(blog.title)
      cy.get('input[name="Author"]').type(blog.author)
      cy.get('input[name="Url"]').type(blog.url)
      cy.get('button[type="submit"]').click()
      cy.contains(/a new blog.*added/)
      cy.contains(`${blog.title} ${blog.author}`)
      cy.contains('view')
    })

    describe('User created a blog', () => {
      beforeEach(() => {
        const blog = {
          title: 'Test blog title',
          author: 'Blog Author',
          url: 'https://example.com/testblog'
        }
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs/',
          body: blog,
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`
          }
        })
        cy.visit('http://localhost:3000')
      })

      it('Users can like a blog', () => {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.get('button').contains('like').click()
        cy.contains('likes 1')
        cy.contains('likes 0').should('not.exist')
      })

      it('User who created a blog can delete it', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('remove').should('not.exist')
      })

      it('User who did NOT create a blog cannot see the delete button', () => {
        cy.contains('logout').click()

        // login as different user
        cy.request(
          'POST',
          'http://localhost:3003/api/login/',
          { username: 'john_doe', password: 'anotherpassword' })
          .then(response => {
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.body)
            )
            cy.visit('http://localhost:3000')
          })

        // continue with test
        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })

      it('Blogs are ordered by like count', () => {
        // add more Blogs
        const blogs = [
          { title: 'A random Blog', author: 'Random Author', url: 'http://example.com/randomblog', likes: 5 },
          { title: 'A cool Blog', author: 'Cool Author', url: 'http://example.com/coolblog', likes: 100 },
          { title: 'A boring Blog', author: 'Boring Author', url: 'http://example.com/boringblog', likes: 1 },
          { title: 'A super Blog', author: 'Super Author', url: 'http://example.com/superblog', likes: 9000 },
        ]

        blogs.forEach(blog =>
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs/',
            body: blog,
            headers: {
              'Authorization': `Bearer ${JSON.parse(localStorage.getItem('currentUser')).token}`
            }
          })
        )

        cy.visit('http://localhost:3000')

        // continue with test

        cy.contains('view')

        cy.get('button').each($el => {
          if ($el.text() === 'view') {
            $el.click()
          }
        })

        cy.contains('like')

        const likes = []

        // extract numbers from each blog
        cy.get('div').each($el => {
          if ($el.text().startsWith('likes')) {
            likes.push(Number($el.text().match(/\d+/)[0]))
          }
        }).then(() => {
          for (let i = 0; i < (likes.length - 1); i++) {
            expect(likes[i] >= likes[i + 1]).to.be.true
          }
        })
      })
    })
  })
})