context(
  "Proceso compra fibra y verificacion no aparece formulario tarjeta",
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
      cy.get("select#address_type_envio")
        .select("CL")
        .should("contain", "CALLE");
      cy.get("input#address_name_envio").type("Burgos");
      cy.get("input#address_number_envio").type("7");
      cy.get("input#address_postalCode_envio").type("28039");
      cy.get("input#address_city_envio").type("Madrid");
      cy.get("select#address_province_envio")
        .select("28")
        .should("contain", "Madrid");
      cy.contains("Continuar ").click();
      cy.wait(1000);

      cy.get("div.switch:first").click({ force: true });

      cy.contains("CONSULTAR").click();
      cy.contains("Continuar ").click();

      cy.contains("TRAMITAR PEDIDO").click();
      cy.wait(1000);
      cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(0).click();
      //cy.contains("NO").click({force:true})
      cy.wait(1000);

      cy.get("#login_user").type("01931279S");

      cy.get("#login_password").type("01931279S");

      cy.get("button.btn.orangeButton").eq(1).click();
      cy.wait(1000);

      cy.get("div.item-detail").contains("18,99€/MES");
      cy.contains("¡TE AHORRAS 7");
      cy.contains(
        "Una de las líneas que tienes ya contratadas con nosotros hace que la Fibra que has seleccionado te salga más barata. ¡Enhorabuena! ;)"
      );

      cy.contains("TRAMITAR PEDIDO").click();

      //Continuar
      cy.get("div.overlay").eq(0).click();
      cy.get("button#nextButton").click();

      cy.get("input#titular").should("not.exist");
      //Ok compra
      //cy.contains("¡SÓLO TE QUEDA UN PASO!")
    });
  }
);
