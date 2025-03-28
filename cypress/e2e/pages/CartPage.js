class CartPage {
    visit() {
      cy.get('#cartur').click();
    }
  
    verifyCartItems(minItems = 3) {
      cy.get('#tbodyid .success').should('have.length.at.least', minItems);
    }
  
    verifyCartTotal() {
        let total = 0;
        cy.get('#tbodyid td:nth-child(3)')
          .each(($element) => {
            const price = parseFloat($element.text().replace(/[^0-9.]/g, ''));
            total += price;
          })
          .then(() => {
            return total;
          });
        cy.get('#totalp').invoke('text').then((cartTotalText) => {
            const cartTotal = parseFloat(cartTotalText.replace(/[^0-9.]/g, ''));
            expect(cartTotal).to.equal(total);
          });
      }

  
    deleteProduct(index) {
      cy.get('#tbodyid td:nth-child(4)').eq(index).contains('Delete').click();
    }
  }
  
  export default CartPage;
  