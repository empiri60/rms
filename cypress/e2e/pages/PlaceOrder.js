class PlaceOrder {

    FilledFormToOrder(){
        cy.get('[data-target="#orderModal"]').click()
        cy.get('#name').type('Muhammad Bilal')
        cy.get('#country').type('Germany')
        cy.get('#city').type('Erfurt')
        cy.get('#card').type('11111111111111111111')
        cy.get('#month').type('04')
        cy.get('#year').type('2028')
        cy.contains('button', 'Purchase').click()
    }
    VerifyOrderSuccessfullyPlaced(){
        cy.get('.sweet-alert').should('be.visible')
        cy.get('.confirm').click()
       
    }
}
export default new PlaceOrder()