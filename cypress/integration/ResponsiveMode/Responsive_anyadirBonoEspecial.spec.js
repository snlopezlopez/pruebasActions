describe(
  "Añadir Bono Especial linea de contrato",
  { viewportWidth: 375, viewportHeight: 812 },
  () => {
    //iphone-7	375	667

    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    beforeEach(() => {
      cy.visitSimyo();
      /*cy.get(".curtain-inner").children().click();
      cy.get("[id=aceptarCookies]").click();*/

      cy.get("div#myPanelNavResponsive.miPanelNav").click();
      cy.get("strong.orange").click();

      cy.get("input#username").type("37502984N");
      cy.get("input#password").type("63041738");

      cy.get("button#submitButton").click();
      cy.wait(1000);
    });
    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    it("Añadimos un bono especial 1GB", () => {
      cy.get("a.bonoEspecial ").click({ force: true });
      cy.get(".specialBundleIt").first().click();
      cy.get('[id="lo_quiero"]').click();
      cy.contains("¿Quieres activar ahora el bono de 1GB ");
      cy.get('[id="guardar"]').click();
      cy.wait(2000);
      cy.contains("¡Misión cumplida!");
      cy.contains("Acabas de contratar aquí tu super bono");
    });
  }
);
