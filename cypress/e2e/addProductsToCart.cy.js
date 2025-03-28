import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import VisitUrl from './pages/basicPage'
import PlaceOrder from './pages/PlaceOrder'

describe('Add Products to Cart and Verify Total Price', () => {
  const productPage = new ProductPage();
  const cartPage = new CartPage();

  it('should add 3 products to the cart one by one and verify the total price', () => {
    VisitUrl.visit();
    cy.wait(2000)

    for (let i = 0; i < 3; i++) {
      productPage.selectProduct(i);
      productPage.addToCart();
      productPage.goBack();
      productPage.goBack();
    }

    // Verify that 3 items are added to the cart
    cartPage.visit();
    cartPage.verifyCartItems();
    cartPage.verifyCartTotal();
  

    // Delete the second product from the cart and verify the new total price
    cartPage.deleteProduct(0);
    cy.wait(2000)
    cartPage.verifyCartTotal();

    PlaceOrder.FilledFormToOrder();
    PlaceOrder.VerifyOrderSuccessfullyPlaced();
  })
    
  



   


});
