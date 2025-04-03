
import BooksApiClient from "../pageObjects/api/BookApiClient.page"

describe('Books API Tests with Object Model', () => {
    const baseUrl = 'https://simple-books-api.glitch.me';
    let apiClient;
    let orderId;
  
    before(() => {
      const email = `test${Date.now()}@example.com`;
      BooksApiClient.authenticate('Test Client', email)
        .then((response) => {
          BooksApiClient.authToken = response.body.accessToken;
        });
    });
  
    beforeEach(() => {
      BooksApiClient.createOrder(1, 'John Doe')
        .then((response) => {
          orderId = response.body.orderId;
        });
    });
  
    afterEach(() => {
      if (orderId) {
        BooksApiClient.deleteOrder(orderId);
      }
    });
  
    describe('Basic API Checks', () => {
      it('should verify API status', () => {
        BooksApiClient.getStatus()
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.status).to.eq('OK');
          });
      });
  
      it('should fetch book list', () => {
        BooksApiClient.getBooks()
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
          });
      });
    });
  
    describe('Order Management', () => {
      it('should create and verify order', () => {
        expect(orderId).to.be.a('string');
        
        BooksApiClient.getOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.customerName).to.eq('John Doe');
          });
      });
  
      it('should update an order', () => {
        BooksApiClient.updateOrder(orderId, { customerName: 'Bilal' })
          .should((response) => {
            expect(response.status).to.eq(204);
          });
  
          BooksApiClient.getOrder(orderId)
          .should((response) => {
            expect(response.body.customerName).to.eq('Bilal');
          });
      });
  
      it('should delete an order', () => {
        BooksApiClient.deleteOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(204);
          });
  
          BooksApiClient.getOrder(orderId)
          .should((response) => {
            expect(response.status).to.eq(404);
          });
      });
    });
  });