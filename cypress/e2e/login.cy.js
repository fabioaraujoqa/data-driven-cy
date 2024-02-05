describe('Login - Data-Driven Tests on Sauce Demo', () => {
  beforeEach(() => {
    cy.visit('/'); //Visita o site saucelabs. Config em cypress.config.js
  });

  it('Deve fazer login com sucesso - Multiplos usuários', () => {
    cy.fixture('loginData').then((users) => { // Fixture carrega os usuários de uma lista
      users.forEach((user) => { // forEach percorrer todo os itens de uma lista Ex. 'loginData.json'
        cy.get('[data-test="username"]').clear().type(user.username) //Preenche login de um arquivo
        cy.get('[data-test="password"]').clear().type(user.password) //Preenche senha de um arquivo
        cy.get('[data-test="login-button"]').click(); //Clica no botão login
        cy.get('.inventory_list').should('be.visible') // Faz a validação do login

        //Passos para sair do login, pois o sistema não permite reset da aplicação
        cy.get('#react-burger-menu-btn').click() // Abre o meno lateral
        cy.get('#logout_sidebar_link').click()  //Clica em Logout
        cy.reload(); //Recarrega a página

      });
    });
  });

  it('Deve fazer login com sucesso - Forma comum', () => {
    // Teste afim de comparar a forma simples com a de multiplos usuários - Data Driven
    cy.get('[data-test="username"]').clear().type('standard_user')
    cy.get('[data-test="password"]').clear().type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('.inventory_list').should('be.visible')
  });
});
