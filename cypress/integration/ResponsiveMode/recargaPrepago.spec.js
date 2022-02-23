context("Recargar Prepago", { viewportWidth: 375, viewportHeight: 812 }, () => {
  beforeEach(() => {
    cy.visitSimyo();

    cy.get("div#myPanelNavResponsive.miPanelNav").click();
    cy.get("strong.orange").click();

    cy.get("input#username").type("644996219");
    cy.get("input#password").type("89671598");

    cy.get("button#submitButton").click();
    cy.wait(1000);
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Fallo al Recargar 10€ de Saldo Tarjeta Erronea", () => {
    cy.get("#mobilePersonalMenu").click();
    cy.get("a.myRecharges ").click({ force: true });
    cy.get("a.myRecharge ").click();
    cy.get("a.cambiarTarjeta").click();
    cy.get("#amount").type("5");
    cy.get("select#creditCardTypeSelect")
      .select("01")
      .should("have.value", "01");
    cy.get("#card_number1").type("4548");
    cy.get("#card_number2").type("8120");
    cy.get("#card_number3").type("4940");
    cy.get("#card_number4").type("0004");
    cy.get("select#creditCardMonthExpired")
      .select("12")
      .should("have.value", "12");
    cy.get("select#creditCardYearExpired")
      .select("30")
      .should("have.value", "30");
    cy.get("#cvv").children("input#card_cvv").type("123", { force: true });
    cy.get("#recargar").click();
    cy.get("button#aceptar").click();
    cy.contains(" Tu recarga se ha realizado con éxito");
  });
});
