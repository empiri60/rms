import addProductToCart from "./pages/addProductsToCart";
import CartPage from "./pages/CartPage";
import PlaceOrder from "./pages/PlaceOrder";

describe("Add Products to Cart and Verify Total Price", () => {
beforeEach(() => {
cy.visit("https://www.demoblaze.com/");
});
const addProductTocart = new addProductToCart();
const cartPage = new CartPage();

it("should add 3 products to the cart one by one and verify the total price", () => {
for (let i = 0; i < 3; i++) {
addProductTocart.selectProduct(i);
addProductTocart.addToCart();
addProductTocart.goBack();
addProductTocart.goBack();
}
cartPage.visit();
cartPage.verifyCartItems();
cartPage.verifyCartTotal();
});

it("Validate the total amount of the products", () => {
for (let i = 0; i < 3; i++) {
addProductTocart.selectProduct(i);
addProductTocart.addToCart();
addProductTocart.goBack();
addProductTocart.goBack();
}
cartPage.visit();
cartPage.verifyCartItems();
cartPage.verifyCartTotal();
});

it("Validate the amount after delete the product from the cart", () => {
for (let i = 0; i < 3; i++) {
addProductTocart.selectProduct(i);
addProductTocart.addToCart();
addProductTocart.goBack();
addProductTocart.goBack();
}
cartPage.visit();
cartPage.deleteProduct(0);
cy.wait(2000);
cartPage.verifyCartTotal();
});

it("Place the order", () => {
cartPage.visit();
PlaceOrder.FilledFormToOrder();
PlaceOrder.VerifyOrderSuccessfullyPlaced();
});
});