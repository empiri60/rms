// cypress/e2e/booksApi.spec.js
import BooksApiClient from "./pages/BooksApiClient"

describe('Books API Tests with Object Model', () => {
    const baseUrl = 'https://simple-books-api.glitch.me';
    let apiClient;
    let orderId;
  
    before(() => {
      // Initialize API client
      const email = `test${Date.now()}@example.com`;
      apiClient = new BooksApiClient(baseUrl);
      
      // Authenticate and set token
      apiClient.authenticate('Test Client', email)
        .then((response) => {
          apiClient.authToken = response.body.accessToken;
        });
    });
  
    beforeEach(() => {
      // Create test order before each test
      apiClient.createOrder(1, 'John Doe')
        .then((response) => {
          orderId = response.body.orderId;
        });
    });
  
    afterEach(() => {
      // Cleanup after each test if order exists
      if (orderId) {
        apiClient.deleteOrder(orderId);
      }
    });
  
    describe('Basic API Checks', () => {
      it('should verify API status', () => {
        apiClient.getStatus()
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('OK');
          });
      });
  
      it('should fetch book list', () => {
        apiClient.getBooks()
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
          });
      });
    });
  
    describe('Order Management', () => {
      it('should create and verify order', () => {
        expect(orderId).to.be.a('string');
        
        apiClient.getOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.customerName).to.eq('John Doe');
          });
      });
  
      it('should update an order', () => {
        apiClient.updateOrder(orderId, { customerName: 'Bilal' })
          .should((response) => {
            expect(response.status).to.eq(204);
          });
  
        apiClient.getOrder(orderId)
          .should((response) => {
            expect(response.body.customerName).to.eq('Bilal');
          });
      });
  
      it('should delete an order', () => {
        apiClient.deleteOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(204);
          });
  
        apiClient.getOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(404);
          });
      });
    });
  });