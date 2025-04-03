class Login {
    navigateToLogin() {
        cy.get('#login2').click()
    }
    enterUsername(username) {
        cy.get('#loginusername').clear().type(username, { delay: 100, force: true }).should('have.value', username)
    }

    enterPassword(password) {
        cy.get('#loginpassword').clear().type(password, { delay: 100, force: true })
    }
    submitLogin() {
        cy.contains('button', 'Log in').click();
    }
    verifySuccessfulLogin() {
        cy.get('#nameofuser').invoke('text').should('eq', 'Welcome bilal@gmail.com')

    }
}
export default new Login()