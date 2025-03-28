class LoginAccount{
    ClickLoginNavigation(){
        cy.get('#login2').click()    
    }
    EnterUsername(username){
        cy.get('#loginusername').clear().type(username,{ delay: 100,force: true }).should('have.value', username)
    }

    EnterPassword(password){
        cy.get('#loginpassword').clear().type(password,{ delay: 100,force: true })
    }
    ClickLoginButton(){
        cy.contains('button', 'Log in').click();
      }
    VerifyWelcomeMessage(){
        cy.get('#nameofuser').invoke('text').should('eq', 'Welcome bilal@gmail.com')

    }
}
export default new LoginAccount()