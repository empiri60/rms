cy.request({
    method: 'POST',
    url: 'https://simple-books-api.glitch.me/api-clients/',
    body: {
        clientName: 'Test Client',
        clientEmail: `test${Date.now()}@example.com`
    }
}).then((response) => {
    expect(response.status).to.eq(201);
    cy.log('Access Token:', response.body.accessToken);
});
