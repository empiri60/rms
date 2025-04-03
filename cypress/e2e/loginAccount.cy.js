/// <reference types="cypress" />
import LoginAccount from './pages/loginAccount';
import VisitUrl from './pages/basicPage';

describe('Login Tests', () => {
  before(() => {
    cy.fixture('userDetails.json').then(data => {
      Cypress.env('loginData', data);
    });
  });
  beforeEach(() => {
    VisitUrl.visit();
  });

  it('should login with valid credentials',()=> {
    const { username, password, welcomeMessage } = Cypress.env('loginData').validUser;
    LoginAccount.ClickLoginNavigation();
    LoginAccount.EnterUsername(username);
    LoginAccount.EnterPassword(password);
    LoginAccount.ClickLoginButton();
    LoginAccount.VerifyWelcomeMessage(welcomeMessage);
  });

  it('should show error with invalid credentials', ()=> {
    const { username, password, errorMessage } = Cypress.env('loginData').invalidUser;
    LoginAccount.ClickLoginNavigation();
    LoginAccount.EnterUsername(username);
    LoginAccount.EnterPassword(password);
    LoginAccount.ClickLoginButton();
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessage);
    });
  });

})