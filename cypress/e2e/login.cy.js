describe('Login - Data-Driven Tests on Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('Deve fazer login com multiplos usuários', () => {
    cy.fixture('loginData').then((users) => {
      users.forEach((user) => {
        cy.get('[data-test="username"]').clear().type(user.username);
        cy.get('[data-test="password"]').clear().type(user.password);
        cy.get('[data-test="login-button"]').click();

        if (user.username !== 'locked_out_user') {
          cy.get('.inventory_list').should('be.visible'); 
          cy.get('#react-burger-menu-btn').click(); 
          cy.get('#logout_sidebar_link').click(); 
        } else {
          cy.get('[data-test="error"]').should('contain', 'Sorry, this user has been locked out.'); 
          cy.reload(); 
        }
      });
    });
  });
});
