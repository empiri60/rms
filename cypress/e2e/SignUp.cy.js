/// <reference types="cypress" />
import SignupPage from '../pageObjects/auth/Signup.page';
import BasePage from '../pageObjects/core/Base.page';
import { faker } from '@faker-js/faker';

describe('Account Registration Suite', () => {
  before(() => {
    cy.fixture('userAccounts.json').then(data => {
      Cypress.env('accountData', data);
    });
  });

  beforeEach(() => {
    BasePage.visit();
  });

  describe('Successful Registration',()=>{
    it('should create account with valid credentials', () => {
      const { validAccount } = Cypress.env('accountData');
      const randomEmail = faker.internet.email();
  
      SignupPage.openRegistrationModal()
        .enterEmail(randomEmail)
        .enterPassword(validAccount.password)
        .submitForm()
        .verifyRegistrationAlert(validAccount.successMessage);
    });

  })

  describe('Error Handling',()=>{

    it('should reject duplicate email registration', () => {
      const { existingAccount } = Cypress.env('accountData');
  
      SignupPage.openRegistrationModal()
        .enterEmail(existingAccount.email)
        .enterPassword(existingAccount.password)
        .submitForm()
        .verifyRegistrationAlert(existingAccount.errorMessage);
    });

    it('should require all mandatory fields', () => {
      const { missingFields } = Cypress.env('accountData');
      const randomEmail = faker.internet.email();
  
      SignupPage.openRegistrationModal()
        .enterEmail(randomEmail)
        .submitForm()
        .verifyRegistrationAlert(missingFields.errorMessage);
    });

  })

 

  
});