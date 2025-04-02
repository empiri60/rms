class ProductPage {
 

  selectProduct(index) {
    cy.get('#tbodyid .card-title').eq(index).click({timeout:3000},{focus:true});

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
