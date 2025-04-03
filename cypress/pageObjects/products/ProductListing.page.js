class ProductCatalog {

  selectProduct(index) {
    cy.get('#tbodyid .card-title a')
      .eq(index)
      .click({ timeout: 3000, force: true });
    return this;
  }

  addToCart() {
    cy.get('#tbodyid .btn-success', { timeout: 10000 }).click();
    cy.on('window:alert', (text) => {
      expect(text).to.include('Product added');
    });
    return this;
  }

  navigateBack() {
    cy.go('back');
    return this;
  }
}
export default new ProductCatalog();