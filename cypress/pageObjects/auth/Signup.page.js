// Registration.page.js
class Registration {

  openRegistrationModal() {
    cy.get('[data-target="#signInModal"]')
      .should('be.visible')
      .click();
    return this;
  }

  completeRegistration(credentials) {
    this.enterEmail(credentials.email)
       .enterPassword(credentials.password)
       .submitForm();
    return this;
  }

  enterEmail(email) {
    cy.get('#sign-username')
      .clear()
      .type(email, { delay: 25 });
    return this;
  }

  enterPassword(password) {
    cy.get('#sign-password')
      .clear()
      .type(password, { delay: 25 });
    return this;
  }

  submitForm() {
    cy.contains('button', 'Sign up')
      .should('be.enabled')
      .click();
    return this;
  }

  verifyRegistrationAlert(expectedMessage) {
    cy.on('window:alert', (actualMessage) => {
      expect(actualMessage).to.equal(expectedMessage);
    });
    return this;
  }
}

export default new Registration();