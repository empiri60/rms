Cypress.Commands.add('login', () => {
    cy.session('user-session', () => {
      // Visit the homepage
      cy.visit('https://www.demoblaze.com/');
  
      // Set cookies for the session manually (you can skip if your app already sets them)
      cy.setCookie('user', '22aae03c-bc73-db79-0c57-dae6ea3849c5');
      cy.setCookie('tokenp_', 'YmlsYWxAZ21haWwuY29tMTc0NDE5OA==');
  
      // Ensure cookies are set correctly (optional)
      cy.getCookies().then((cookies) => {
        cy.log('Cookies after setting:', cookies);
      });
  
      // Proceed with login UI actions
      cy.get('#login2').should('be.visible').click();
  
      cy.get('#loginusername')
        .clear()
        .type('bilal@gmail.com', { delay: 100, force: true })
        .should('have.value', 'bilal@gmail.com');
  
      cy.get('#loginpassword')
        .clear()
        .type('dildil@@123', { delay: 100, force: true });
  
      cy.contains('button', 'Log in').click();
  
      // Verify successful login
      cy.get('#nameofuser').invoke('text').should('eq', 'Welcome bilal@gmail.com');
    });
  });
  