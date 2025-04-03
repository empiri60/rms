import ProductListing from "../pageObjects/products/ProductListing.page";
import ShoppingCart from "../pageObjects/cart/Shopping.Cart.page";
import Checkout from "../pageObjects/cart/Checkout.page";


describe("Cart Operations Suite", () => {
    beforeEach(() => {
        cy.visit("https://www.demoblaze.com/");
    });

    describe('Cart Management', () => {

        it("should add products and verify items in cart", () => {
            for (let i = 0; i < 3; i++) {
                ProductListing.selectProduct(i);
                ProductListing.addToCart();
                ProductListing.navigateBack();
                ProductListing.navigateBack();
            }
            ShoppingCart.navigate();
            ShoppingCart.verifyItemsCount();
        });
        it("should calculate correct total amount", () => {
            for (let i = 0; i < 3; i++) {
                ProductListing.selectProduct(i);
                ProductListing.addToCart();
                ProductListing.navigateBack();
                ProductListing.navigateBack();
            }
            ShoppingCart.navigate();
            ShoppingCart.verifyItemsCount();
            ShoppingCart.verifyCartTotal();
        });
        it("should update total after deleting an item", () => {
            for (let i = 0; i < 3; i++) {
                ProductListing.selectProduct(i);
                ProductListing.addToCart();
                ProductListing.navigateBack();
                ProductListing.navigateBack();
            }
            ShoppingCart.navigate();
            ShoppingCart.removeItem(0);
            cy.wait(2000);
            ShoppingCart.verifyCartTotal();
        });
    })

    describe('Order Placement', () => {

        it("should complete order placement successfully", () => {
            ShoppingCart.navigate();
            Checkout.completeCheckout();
            Checkout.verifyOrderConfirmation();
        });

    })

});
