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

  it("Comprobar que se descuentan euros del total si usas los que tienes de regalo ", () => {
    cy.login("01931279S", "01931279S");
    cy.get("a.arrowed.desktop").eq(0).click();
    cy.wait(2000);
    //cy.get('input#checkPlazos_4028f3b272a7141b0173379be72d7834').click()
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();
    cy.wait(2000);
    cy.get("p#totalCompra.precio.orange").should("have.text", "0€");
    cy.get("div.overlay").eq(0).click();
    cy.wait(2000);
    cy.get("p#totalCompra.precio.orange").should("have.text", "103€");

    //cy.get('div.item-detail').children().contains("21€ PAGO INICIAL | 7€/MES X 24 MESES")
  });
});
