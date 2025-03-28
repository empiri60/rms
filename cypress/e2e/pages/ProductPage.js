class ProductPage {
 

  selectProduct(index) {
    cy.get('#tbodyid > div').eq(index).click({timeout:2000});

  }

  addToCart() {
    cy.get('#tbodyid .btn-success', { timeout: 10000 }).click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Product added'); 
    });
  }

  goBack() {
    cy.go('back');
  }
}

export default ProductPage;
