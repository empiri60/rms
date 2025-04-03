class ShoppingCart {
  navigate() {
    cy.get('#cartur').click();
  }

  verifyItemsCount(minItems = 3) {
    cy.get('#tbodyid .success').should('have.length.at.least', minItems);
  }

  verifyCartTotal() {
      let calculatedTotal = 0;
      cy.get('#tbodyid td:nth-child(3)')
        .each(($element) => {
          const price = parseFloat($element.text().replace(/[^0-9.]/g, ''));
          calculatedTotal += price;
        })
        .then(() => {
          return calculatedTotal;
        });
      cy.get('#totalp').invoke('text').then((cartTotalText) => {
          const cartTotal = parseFloat(cartTotalText.replace(/[^0-9.]/g, ''));
          expect(cartTotal).to.equal(calculatedTotal);
        });
    }


  removeItem(index) {
    cy.get('#tbodyid td:nth-child(4)').eq(index).contains('Delete').click();
  }
}

export default new ShoppingCart;
