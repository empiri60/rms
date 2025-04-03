// cypress/support/pages/PlaceOrder.js
class Checkout {
  completeCheckout() {
    cy.fixture('userAccounts.json').then((userdetails) => {
      cy.get('[data-target="#orderModal"]').click();
      cy.get('#name').type(userdetails.userDetails.name);
      cy.get('#country').type(userdetails.userDetails.country);
      cy.get('#city').type(userdetails.userDetails.city);
      cy.get('#card').type(userdetails.userDetails.card);
      cy.get('#month').type(userdetails.userDetails.month);
      cy.get('#year').type(userdetails.userDetails.year);
    });
    cy.contains('button', 'Purchase').click();
  }

  verifyOrderConfirmation() {
    cy.get('.sweet-alert').should('be.visible');
    cy.get('.confirm').click();
  }
}

export default new Checkout();