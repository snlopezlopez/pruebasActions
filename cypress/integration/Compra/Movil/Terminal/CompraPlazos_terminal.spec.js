context("Compra a plazos terminal", () => {
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
    cy.get("input#searchBrandIds_2").click();
    cy.contains("Aplicar filtros").click();
    cy.wait(2000);
    cy.get("input#checkPlazos_4028f3b272a7141b0172cb2b467c2b16")
      .eq(1)
      .click({ force: true });
    cy.get("a.orangeButton.btn.medium.addCartShop")
      .eq(10)
      .click({ force: true });
    cy.wait(2000);
    cy.get("a.cart:first").click();
    cy.get("div.item-detail")
      .children()
      .contains("21€ PAGO INICIAL | 7€/MES X 24 MESES");
  });

  it("Comprobar que se refleja el pago a plazos cliente existente ", () => {
    cy.login("01931279S", "01931279S");
    cy.get("a.arrowed.desktop").eq(0).click();
    cy.get("input#checkPlazos_4028f3b272a7141b0173379be72d7834").click();
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();
    cy.wait(2000);
    cy.get("div.item-detail")
      .children()
      .contains("21€ PAGO INICIAL | 7€/MES X 24 MESES");
  });
});
