class ProductPage {
 

  selectProduct(index) {
    cy.get('#tbodyid > div').eq(index).wait(1000).click();

  }

  addToCart() {
    cy.get('#tbodyid .btn-success', { timeout: 5000 }).click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Product added'); 
    });
  }

  goBack() {
    cy.go('back');
  }
}

export default ProductPage;
