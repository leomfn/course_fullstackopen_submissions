describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Max Mustermann',
      username: 'max_mustermann',
      password: 'testpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

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
      })

      it.only('User who created a blog can delete it', () => {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('remove').should('not.exist')
      })
    })
  })
})