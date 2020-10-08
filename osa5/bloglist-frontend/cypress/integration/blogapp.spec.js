describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')

  })

  it('Login form is shown by default', function() {
    cy.contains('Username')
    cy.contains('Password')
    cy.contains('Log me in')
  })

  describe('Login',function() {

    it('User can log in with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test is currently logged in')
    })

    it('User cannot log in with incorrect credentials', function() {
      cy.get('#username').type('qwerty')
      cy.get('#password').type('uiop')
      cy.get('#login-button').click()
      cy.get('#notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('blogtitle')
      cy.get('#author').type('blogauthor')
      cy.get('#url').type('blogurl')
      cy.get('#addBlogButton').click()
      cy.get('#bloglist').should('contain', 'blogtitle by blogauthor')
    })
  })
})