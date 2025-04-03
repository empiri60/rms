describe('Simple Books API Tests', () => {
    const baseUrl = 'https://simple-books-api.glitch.me';

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
            cy.wrap(response.body.accessToken).as('apiToken');
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

    it('should return a list of fiction books', () => {
        cy.request({ url: `${baseUrl}/books`, qs: { type: 'fiction' } }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            response.body.forEach((book) => {
                expect(book.type).to.eq('fiction');
            });
        });
    });

    it('should return a limited number of books', () => {
        cy.request({ url: `${baseUrl}/books`, qs: { limit: 5 } }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
            expect(response.body.length).to.be.at.most(5);
        });
    });

    it('should retrieve details of a single book', () => {
        cy.request(`${baseUrl}/books`).then((response) => {
            expect(response.status).to.eq(200);
            const bookId = response.body[0].id;
            cy.request(`${baseUrl}/books/${bookId}`).then((bookResponse) => {
                expect(bookResponse.status).to.eq(200);
                expect(bookResponse.body).to.have.property('id', bookId);
            });
        });
    });

    it('should submit a new order', function () {
        const orderData = {
            bookId: 1,
            customerName: 'John Doe'
        };

        cy.request({
            method: 'POST',
            url: `${baseUrl}/orders`,
            headers: { Authorization: `Bearer ${this.apiToken}` },
            body: orderData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('orderId');
        });
    });

    it('should retrieve all orders', function () {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/orders`,
            headers: { Authorization: `Bearer ${this.apiToken}` }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array');
        });
    });

    it('should retrieve details of a single order', function () {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/orders`,
            headers: { Authorization: `Bearer ${this.apiToken}` }
        }).then((response) => {
            expect(response.status).to.eq(200);
            const orderId = response.body[0].id;
            cy.request({
                method: 'GET',
                url: `${baseUrl}/orders/${orderId}`,
                headers: { Authorization: `Bearer ${this.apiToken}` }
            }).then((orderResponse) => {
                expect(orderResponse.status).to.eq(200);
                expect(orderResponse.body).to.have.property('id', orderId);
            });
        });
    });

    it('should update an order', function () {
        const updatedData = { customerName: 'Jane Doe' };

        cy.request({
            method: 'PATCH',
            url: `${baseUrl}/orders/1`,
            headers: { Authorization: `Bearer ${this.apiToken}` },
            body: updatedData,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('customerName', 'Jane Doe');
        });
    });

    it('should delete an order', function () {
        cy.request({
            method: 'DELETE',
            url: `${baseUrl}/orders/1`,
            headers: { Authorization: `Bearer ${this.apiToken}` },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(204);
        });
    });
});
