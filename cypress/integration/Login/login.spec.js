describe("Acceso a la web", () => {
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it("Login correcto", () => {
    cy.visitSimyo();

    cy.login("01931279S", "01931279S");
    cy.wait(10000);
    cy.get('[id="bloqueLogueado"]')
      .children()
      .get('[class="estado flex"]')
      .contains("Activa");
  });

  /* it('Login correcto', () => {
      cy.visit("http://simyo.es:8080/simyo/login") 
      //cy.contains(" ACEPTAR").click()
      //cy.get('[class="curtain-inner"]').children().click()
      //cy.get('[id=""]').click()
      cy.get('#username').type("01931279S")
      cy.get('#password').type("01931279S")
      cy.get('#submitButton').click()
      cy.wait(10000)
      cy.get('[id="bloqueLogueado"]').children().get('[class="estado flex"]').contains("Activa")
     })

     it('Login correcto', () => {
      cy.visit("http://simyo.es:8080/simyo/login") 
      //cy.contains(" ACEPTAR").click()
      //cy.get('[class="curtain-inner"]').children().click()
      //cy.get('[id=""]').click()
      cy.get('#username').type("01931279S")
      cy.get('#password').type("01931279S")
      cy.get('#submitButton').click()
      cy.wait(10000)
      cy.get('[id="bloqueLogueado"]').children().get('[class="estado flex"]').contains("Activa")
     })

     it('Login correcto', () => {
      cy.visit("http://simyo.es:8080/simyo/login") 
      //cy.contains(" ACEPTAR").click()
      //cy.get('[class="curtain-inner"]').children().click()
      //cy.get('[id=""]').click()
      cy.get('#username').type("01931279S")
      cy.get('#password').type("01931279S")
      cy.get('#submitButton').click()
      cy.wait(10000)
      cy.get('[id="bloqueLogueado"]').children().get('[class="estado flex"]').contains("Activa")
     })

     it('Login correcto', () => {
      cy.visit("http://simyo.es:8080/simyo/login") 
      //cy.contains(" ACEPTAR").click()
      //cy.get('[class="curtain-inner"]').children().click()
      //cy.get('[id=""]').click()
      cy.get('#username').type("01931279S")
      cy.get('#password').type("01931279S")
      cy.get('#submitButton').click()
      cy.wait(10000)
      cy.get('[id="bloqueLogueado"]').children().get('[class="estado flex"]').contains("Activa")
     })*/
});
