/// <reference types="cypress" />
import Login from '../pageObjects/auth/Login.page';
import BasePage from '../pageObjects/core/Base.page';

describe('Login Tests', () => {
  before(() => {
    cy.fixture('userAccounts.json').then(data => {
      Cypress.env('loginData', data);
    });
  });
  beforeEach(() => {
    BasePage.visit();
  });

  describe('Successful Authentication',()=>{
    it('should authenticate with valid credentials',()=> {
      const { username, password, welcomeMessage } = Cypress.env('loginData').validUser;
      Login.navigateToLogin();
      Login.enterUsername(username);
      Login.enterPassword(password);
      Login.submitLogin();
      Login.verifySuccessfulLogin(welcomeMessage);
    });

  })

  describe('Authentication Failure',()=>{

  it('should display error for invalid credentials', ()=> {
    const { username, password, errorMessage } = Cypress.env('loginData').invalidUser;
    Login.navigateToLogin();
    Login.enterUsername(username);
    Login.enterPassword(password);
    Login.submitLogin();
    cy.on('window:alert', (text) => {
      expect(text).to.equal(errorMessage);
    });
  });

  })


})