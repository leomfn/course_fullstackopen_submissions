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
      // cy.contains('logout')
      // cy.contains('blogs')
      // cy.contains('new note')
    })
  })


  // describe('when logged in'), () => {
  //   beforeEach(() => {

  //   })
  // }
})