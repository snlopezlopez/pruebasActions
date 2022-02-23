describe(
  "Login con resolucion de pantalla movil",
  { viewportWidth: 375, viewportHeight: 812 },
  () => {
    //iphone-7	375	667

    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    it("Login correcto", () => {
      //Cypress.config('pageLoadTimeout',200000)
      //cy.viewport('iphone-x')
      cy.visitSimyo();
      /*cy.get(".curtain-inner").children().click();
      cy.get("[id=aceptarCookies]").click();*/

      cy.get("div#myPanelNavResponsive.miPanelNav").click();
      cy.get("strong.orange").click();
      //debugger
      cy.get("input#username").type("644996219");
      cy.get("input#password").type("89671598");
      // cy.login('644991617','33674085')
      cy.get("button#submitButton").click();
      cy.wait(1000);

      cy.get("div#mobilePersonalMenu.mobilePersonalMenu").click();
      cy.get("li.liRecarga.item-mas").click();
      cy.get("a.myRecharge ").click();
      cy.wait(1000);

      cy.get("a.cambiarTarjeta").click();
      cy.wait(2000);

      cy.get("input#amount").type("5");
      cy.get("select#creditCardTypeSelect")
        .select("01")
        .should("contain", "Visa");
      cy.get("input#card_number1").type("4548");
      cy.get("input#card_number2").type("8120");
      cy.get("input#card_number3").type("4940");
      cy.get("input#card_number4").type("0004");
      cy.get("select#creditCardMonthExpired")
        .select("12")
        .should("contain", "12");
      cy.get("select#creditCardYearExpired")
        .select("30")
        .should("contain", "30");
      cy.get("input#card_cvv").type("123", { force: true });
      cy.get("input#card_holder").type("Pepe Pérez Pérez");

      cy.get("a#recargar").click();
    });
  }
);
