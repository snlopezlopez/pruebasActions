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
      cy.get("input#username").type("37502984N");
      cy.get("input#password").type("63041738");
      // cy.login('644991617','33674085')
      cy.get("button#submitButton").click();
      cy.get("#mobilePersonalMenu").should("be.visible");

      cy.get("#mobilePersonalMenu").click();
      //cy.contains("ÁREA PERSONAL").click()
      //cy.get('a.myPanel').eq(1).click()

      //login('01931279S','01931279S')
      //cy.wait(10000)

      cy.get("li#mobileLogOut").contains("Desconectarme");
      cy.get("li.estado").children("span.orange").should("have.text", "Activa");
      //cy.get('[id="bloqueLogueado"]').children().get('[class="estado flex"]').contains("Activa")
    });
  }
);
