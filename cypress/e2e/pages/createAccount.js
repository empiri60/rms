class CreateAccount {
  clickNavigation() {
    cy.get('[data-target="#signInModal"]').click();
    return this; // Return the instance for chaining
  }

  enterEmail(email) {
    cy.get('#sign-username').clear().type(email);
    return this;
  }

  enterPassword(password) {
    cy.get('#sign-password').clear().type(password);
    return this;
  }

  clickSignupButton() {
    cy.contains('button', 'Sign up').click();
    return this;
  }

  verifyAlertMessage(expectedMessage) {
    cy.on('window:alert', (text) => {
      expect(text).to.equal(expectedMessage);
    });
    return this;
  }
}

export default new CreateAccount();