/// <reference types="cypress" />
import CreateAccount from './pages/createAccount';
import VisitUrl from './pages/basicPage';
import { faker } from '@faker-js/faker';

describe('Create an Account', () => {
  // Load fixture data once before any tests run
  before(() => {
    cy.fixture('userDetails.json').then(data => {
      Cypress.env('accountData', data);
    });
  });

  beforeEach(() => {
    VisitUrl.visit();
  });

  it('Verify that a user can successfully create an account with valid information', () => {
    const { validAccount } = Cypress.env('accountData');
    const randomEmail = faker.internet.email();

    CreateAccount.clickNavigation()
      .enterEmail(randomEmail)
      .enterPassword(validAccount.password)
      .clickSignupButton()
      .verifyAlertMessage(validAccount.successMessage);
  });

  it('Verify error when using an already registered email', () => {
    const { existingAccount } = Cypress.env('accountData');

    CreateAccount.clickNavigation()
      .enterEmail(existingAccount.email)
      .enterPassword(existingAccount.password)
      .clickSignupButton()
      .verifyAlertMessage(existingAccount.errorMessage);
  });

  it('Verify appropriate error messages when required fields are missing', () => {
    const { missingFields } = Cypress.env('accountData');
    const randomEmail = faker.internet.email();

    CreateAccount.clickNavigation()
      .enterEmail(randomEmail)
      .clickSignupButton()
      .verifyAlertMessage(missingFields.errorMessage);
  });
});