describe('Simple Books API Tests', () => {
    const baseUrl = 'https://simple-books-api.glitch.me';
    let apiToken;
    let orderId;

    // Get API token before any test
    before(() => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/api-clients/`,
            body: {
                clientName: 'Test Client',
                clientEmail: `test${Date.now()}@example.com`
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            apiToken = response.body.accessToken;
        });
    });

    // Create an order before each test that needs it
    beforeEach(() => {
        const orderData = {
            bookId: 1,
            customerName: 'John Doe'
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/orders`,
            headers: { Authorization: `Bearer ${apiToken}` },
            body: orderData,
        }).then((response) => {
            orderId = response.body.orderId;
        });
    });

    it('should return API status as OK', () => {
        cy.request(`${baseUrl}/status`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('status', 'OK');
        });
    });

    it('should return a list of books', () => {
        cy.request(`${baseUrl}/books`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should retrieve details of a single book', () => {
        cy.request(`${baseUrl}/books`).then((response) => {
            const bookId = response.body[2].id;
            cy.request(`${baseUrl}/books/${bookId}`).then((bookResponse) => {
                expect(bookResponse.status).to.eq(200);
                expect(bookResponse.body).to.have.property('id', bookId);
            });
        });
    });

    it('should update an order', () => {
        const updatedData = { customerName: 'bilal' };
    
        // 1. Perform the update (expecting 204)
        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/orders/${orderId}`,
            headers: { Authorization: `Bearer ${apiToken}` },
            body: updatedData,
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    
        // 2. Verify the update by fetching the order
        cy.request({
            method: 'GET',
            url: `${baseUrl}/orders/${orderId}`,
            headers: { Authorization: `Bearer ${apiToken}` }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('customerName', 'bilal');
        });
    });

    it('should retrieve all orders', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/orders`,
            headers: { Authorization: `Bearer ${apiToken}` }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should delete an order', () => {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/orders/${orderId}`,
            headers: { Authorization: `Bearer ${apiToken}` }
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });
});