import addProductToCart from './pages/addProductsToCart';
import CartPage from './pages/CartPage';
import VisitUrl from './pages/basicPage'
import PlaceOrder from './pages/PlaceOrder'

describe('Add Products to Cart and Verify Total Price', () => {
  const addProductTocart = new addProductToCart();
  const cartPage = new CartPage();
  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
  })

  it('should add 3 products to the cart one by one and verify the total price', () => {
  
    for (let i = 0; i < 3; i++) {
      addProductTocart.selectProduct(i);
      addProductTocart.addToCart();
      addProductTocart.goBack();
      addProductTocart.goBack();
    }
  })

    it('Validate the total amount of the product',()=>{
      cartPage.visit();
      cartPage.verifyCartItems();
      cartPage.verifyCartTotal();

    })

  
    it('Validate the amount after delete the product from the cart',()=>{
      cartPage.deleteProduct(0);
      cy.wait(2000)
      cartPage.verifyCartTotal();

    })

    it('Place the order',()=>{
      PlaceOrder.FilledFormToOrder();
      PlaceOrder.VerifyOrderSuccessfullyPlaced();
    })
});