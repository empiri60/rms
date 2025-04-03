// cypress/support/api/booksApiClient.js

class BooksApiClient {
    constructor(baseUrl, authToken) {
      this.baseUrl = baseUrl || 'https://simple-books-api.glitch.me';
      this.authToken = authToken;
    }
  
    // Auth
    authenticate(clientName, clientEmail) {
      return cy.request({
        method: 'POST',
        url: `${this.baseUrl}/api-clients/`,
        body: { clientName, clientEmail }
      });
    }
  
    // Orders
    createOrder(bookId, customerName) {
      return this._request('POST', '/orders', { bookId, customerName });
    }
  
    getOrder(orderId) {
      return this._request('GET', `/orders/${orderId}`);
    }
  
    updateOrder(orderId, updates) {
      return this._request('PATCH', `/orders/${orderId}`, updates);
    }
  
    deleteOrder(orderId) {
      return this._request('DELETE', `/orders/${orderId}`);
    }
  
    getAllOrders() {
      return this._request('GET', '/orders');
    }
  
    // Books
    getBooks() {
      return cy.request(`${this.baseUrl}/books`);
    }
  
    getBookDetails(bookId) {
      return cy.request(`${this.baseUrl}/books/${bookId}`);
    }
  
    getStatus() {
      return cy.request(`${this.baseUrl}/status`);
    }
  
    // Private method for authenticated requests
    _request(method, endpoint, body = null) {
      return cy.request({
        method,
        url: `${this.baseUrl}${endpoint}`,
        headers: { Authorization: `Bearer ${this.authToken}` },
        body,
        failOnStatusCode: false
      });
    }
  }
  
  export default BooksApiClient;