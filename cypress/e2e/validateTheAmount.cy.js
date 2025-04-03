import CartPage from './pages/CartPage';
import VisitUrl from './pages/basicPage'

describe('Validate the amount', () => {
    const cartPage = new CartPage();

    it('Validate the amount of the product',()=>{
        VisitUrl.visit();
        cartPage.visit();
        cartPage.verifyCartItems();
        cartPage.verifyCartTotal();
    })
  it('Delete product and validate the amount of the product',()=>{

    cartPage.deleteProduct(0);
    cy.wait(2000)
    cartPage.verifyCartTotal();
  })

})