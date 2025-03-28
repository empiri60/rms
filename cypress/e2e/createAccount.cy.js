/// <reference types="cypress" />
import CreateAccount from './pages/createAccount';
import VisitUrl from './pages/basicPage'
import { faker } from '@faker-js/faker';
const randomEmail = faker.internet.email();

describe('Create an Account', () => {
  beforeEach(() => {
    VisitUrl.visit()
  })

  it('Verify that a user can successfully create an account with valid information', () => {
    CreateAccount.clickNavigation()
    CreateAccount.enterEmail(randomEmail)
    CreateAccount.enterPassword('abcd3@@123')
    CreateAccount.clickSignupButton()
    CreateAccount.verifyAlertMessage('Sign up successful.')
  })

  it('Verify error when using an already registered email', () => {
    CreateAccount.clickNavigation()
    CreateAccount.enterEmail('abc@gmail.com')
    CreateAccount.enterPassword('abcd3@@123')
    CreateAccount.clickSignupButton()
    CreateAccount.verifyAlertMessage('This user already exist.')
  })

  it('Verify appropriate error messages when required fields are missing', () => {
    CreateAccount.clickNavigation()
    CreateAccount.enterEmail(randomEmail)
    CreateAccount.clickSignupButton()
    CreateAccount.verifyAlertMessage('Please fill out Username and Password.')
  
  })
})