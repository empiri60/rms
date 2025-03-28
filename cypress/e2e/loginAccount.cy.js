/// <reference types="cypress" />
import LoginAccount from './pages/loginAccount';
import VisitUrl from './pages/basicPage'
describe('Create an Account', () => {
    beforeEach(() => {
      VisitUrl.visit()
    })
    it('Verify that a user can log in with correct username/email and password.',()=>{
        LoginAccount.ClickLoginNavigation()
        LoginAccount.EnterUsername('bilal@gmail.com')
        LoginAccount.EnterPassword('dildil@@123')
        LoginAccount.ClickLoginButton()
        LoginAccount.VerifyWelcomeMessage()

    })
})