describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    const user2 = {
      name: 'user',
      username: 'user',
      password: 'user'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user2)
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
      cy.login({ username: 'test', password: 'test' })
    })

    it('A blog can be created', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('blogtitle')
      cy.get('#author').type('blogauthor')
      cy.get('#url').type('blogurl')
      cy.get('#addBlogButton').click()
      cy.get('#bloglist').should('contain', 'blogtitle by blogauthor')
    })

    it('A blog can be liked', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('blogtitle')
      cy.get('#author').type('blogauthor')
      cy.get('#url').type('blogurl')
      cy.get('#addBlogButton').click()
      cy.get('#bloglist').should('contain', 'blogtitle by blogauthor')

      cy.contains('blogtitle by blogauthor').click()
      cy.get('#likes').should('contain', 'Likes: 0')
      cy.get('#likeButton').click()
      cy.get('#likes').should('contain', 'Likes: 1')
      cy.get('#likes').should('not.contain', 'Likes: 0')
    })

    it('A blog can be removed by same user who added it', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('blogToBeRemoved')
      cy.get('#author').type('authorToBeRemoved')
      cy.get('#url').type('urlToBeRemoved')
      cy.get('#addBlogButton').click()
      cy.get('#bloglist').should('contain', 'blogToBeRemoved by authorToBeRemoved')

      cy.contains('blogToBeRemoved by authorToBeRemoved').click()
      cy.get('#removeButton').click()
      cy.get('#bloglist').should('not.contain', 'blogToBeRemoved by authorToBeRemoved')
    })

    it('A blog cannot be removed by a user who did not add the blog', function() {
      cy.contains('Add new blog').click()
      cy.get('#title').type('blogNotToBeRemoved')
      cy.get('#author').type('authorNotToBeRemoved')
      cy.get('#url').type('urlNotToBeRemoved')
      cy.get('#addBlogButton').click()
      cy.get('#bloglist').should('contain', 'blogNotToBeRemoved by authorNotToBeRemoved')
      cy.get('#logoutButton').click()

      cy.login({ username: 'user', password: 'user' })
      cy.wait(500)
      cy.get('#singleBlog').click()
      cy.get('#singleBlog').should('not.contain', '#removeButton')
    })
  })

  describe('Blog ordering',function() {

    it('Blogs are ordered by number of likes in descending order', function() {
      cy.login({ username: 'test', password: 'test' })
      cy.setToken().then(val => {
        const token = val
        const blogs = [
          {
            title: 'blogWithOneLike',
            author: 'authorWithOneLike',
            url: 'urlWithOneLike',
            likes: 1
          },
          {
            title: 'blogWithTwoLikes',
            author: 'authorWithTwoLikes',
            url: 'urlWithTwoLikes',
            likes: 2
          },
          {
            title: 'blogWithLotsOfLikes',
            author: 'authorWithLotsOfLikes',
            url: 'urlWithLotsOfLikes',
            likes: 1231231
          },
          {
            title: 'blogWithZeroLikes',
            author: 'authorWithZeroLikes',
            url: 'urlWithZeroLikes',
            likes: 0
          }
        ]
        blogs.forEach(blog => cy.request(
          {
            method: 'POST',
            url: 'http://localhost:3001/api/blogs',
            body: blog,
            auth: { bearer: token }
          })
        )
        cy.visit('http://localhost:3000')
        cy.get('#bloglist>#singleBlog').then(blogs => {
          cy.get(blogs[0]).should('contain', 'blogWithLotsOfLikes')
          cy.get(blogs[1]).should('contain', 'blogWithTwoLikes')
          cy.get(blogs[2]).should('contain', 'blogWithOneLike')
          cy.get(blogs[3]).should('contain', 'blogWithZeroLikes')
        })
      })
    })
  })
})