context(
  "Comprobar que salta error cuando intentas continuar desde el primer normalizador",
  () => {
    beforeEach(() => {
      cy.visitSimyo();
      //Añadimos dos lineas y un terminal
      cy.wait(1000);
      cy.get("a#buttonFibra").click();
      cy.get("a.grayButton.btn.addCart").eq(0).click();

      cy.get("a.cart:first").click();

      cy.wait(3000);
    });
    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    it("Comprar fibra Usuario nuevo ", () => {
      cy.get("button.btn.orangeButton.coverage").click();
      cy.wait(1000);

      cy.get("select#address_type_envio")
        .select("CL")
        .should("contain", "CALLE");
      cy.get("input#address_name_envio").type("Burgosssssss");
      cy.get("input#address_number_envio").type("7");
      cy.get("input#address_postalCode_envio").type("28039");
      cy.get("input#address_city_envio").type("Madrid");
      cy.get("select#address_province_envio")
        .select("28")
        .should("contain", "Madrid");
      cy.contains("Continuar ").click();
      cy.wait(1000);
      cy.contains("Continuar ").click();
      cy.wait(1000);
      cy.contains("Parece que algo no ha ido bien");
      cy.contains("Debe seleccionar una dirección.");
    });
  }
);
