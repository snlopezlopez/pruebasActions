context("Proceso compra tarifa móvil", () => {
  beforeEach(() => {
    cy.visitSimyo();

    cy.wait(1000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar que se refleja el pago a plazos cliente nuevo ", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();

    //Añadimos terminales
    cy.get("a.arrowed.desktop").eq(0).click();
    cy.contains("MARCA").click();
    cy.wait(1000);
    cy.get("input#searchBrandIds_5").click();
    cy.contains("Aplicar filtros").click();
    cy.wait(2000);
    cy.get("#4028f3b272a7141b0172a8431cdc0074")
      .contains("PAGA MENOS AL MES")
      .click({ force: true });
    cy.wait(2000);
    cy.get("div.switch").eq(0).click(190.62, 190.62, { force: true });
    // cy.get('.inputInicialB').type("80")
    cy.get("a#loQuieroAplazos").click();
    cy.wait(1000);
    cy.get("#4028f3b272a7141b0172a8431cdc0074")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.contains("PAGO INICIAL");
  });
});
