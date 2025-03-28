class CreateAccount{
      clickNavigation(){
        cy.get('#signin2').click()
      }
      enterEmail(randomEmail){
        cy.get('#sign-username').clear().type(randomEmail,{ delay: 100,force: true }).should('have.value', randomEmail)
      }
      enterPassword(){
        cy.get('#sign-password').clear().type('abcd3@@123',{ delay: 100, force: true  })
      }
      clickSignupButton(){
        cy.contains('button', 'Sign up').click();
      }
      verifyAlertMessage(expectedMessage){
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal(expectedMessage);
          });
      }
}
export default new CreateAccount();