context(
  "Proceso compra fibra y verificacion no aparece formulario tarjeta",
  () => {
    beforeEach(() => {
      cy.visitSimyo();
      //Añadimos dos lineas y un terminal
      cy.wait(1000);
      cy.get("a#buttonMovil").click();
      cy.get("#intSlider").click(221.25, 15);
      cy.get("#buttonAddTotalTarifa").click();

      cy.get("a.cart:first").click();

      cy.wait(3000);
    });
    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    it("Comprar tarifa móvil", () => {
      cy.contains("TRAMITAR PEDIDO").click();
      cy.wait(1000);
      cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(0).click();
      //cy.contains("NO").click({force:true})
      cy.wait(1000);

      cy.get("#login_user").type("0193127S");

      cy.get("#login_password").type("01931279S");

      cy.get("button.btn.orangeButton").eq(1).click();
      cy.wait(1000);

      cy.contains(
        "¡Vaya! Los datos que has introducido no son correctos. Revísalos y prueba otra vez... a la segunda va la vencida!"
      );

      cy.contains("TRAMITAR PEDIDO").click();
      cy.wait(1000);
      cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(0).click();
      //cy.contains("NO").click({force:true})
      cy.wait(1000);

      cy.get("#login_user").type("01931279S");

      cy.get("#login_password").type("01931279S");

      cy.get("button.btn.orangeButton").eq(1).click();
      cy.wait(1000);

      cy.contains("TRAMITAR PEDIDO").click();
      cy.wait(1000);
    });
  }
);
