context("Gastos en Cesta Solo móviles", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.wait(1000);
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar gastos hasta 20 tarifas móviles", () => {
    cy.get("a#buttonMovil").click();
    //cy.get('#fixSlider').click(20,14,15)
    // 208.58,19)
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "7€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "7€");

    cy.get(".select").click();
    cy.wait(1000);
    cy.get("#dropdown2_10").click();
    cy.get(
      "input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden"
    ).type("20");
    cy.wait(1000);
    cy.get(".a-spacing-top-small").click();
    cy.wait(1000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix")
      .children("#gastosEnvio.precio")
      .eq(1)
      .should("have.text", "30€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "37€");
  });

  it("Comprobar gastos desde 21 hasta 100 tarifas móviles", () => {
    cy.get("a#buttonMovil").click();
    //cy.get('#fixSlider').click(20,14,15)
    // 208.58,19)
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "7€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "7€");

    cy.get(".select").click();
    cy.wait(1000);
    cy.get("#dropdown2_10").click();
    cy.get(
      "input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden"
    ).type("21");
    cy.wait(1000);
    cy.get(".a-spacing-top-small").click();
    cy.wait(1000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix")
      .children("#gastosEnvio.precio")
      .eq(1)
      .should("have.text", "30€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "41,2€");
    cy.get("a.close-items-20").click();

    cy.wait(1000);

    cy.get("input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden")
      .type("100")
      .clear();
    cy.get(
      "input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden"
    ).type("100");
    cy.get(".a-spacing-top-small").click();
    cy.wait(1000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix")
      .children("#gastosEnvio.precio")
      .eq(1)
      .should("have.text", "100€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "127€");
    cy.get("a.close-items-20").click();
  });

  it("Comprobar gastos desde 101 hasta 9.999 tarifas móviles", () => {
    cy.get("a#buttonMovil").click();
    //cy.get('#fixSlider').click(20,14,15)
    // 208.58,19)
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "7€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "7€");

    cy.get(".select").click();
    cy.wait(1000);
    cy.get("#dropdown2_10").click();
    cy.get(
      "input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden"
    ).type("101");
    cy.wait(1000);
    cy.get(".a-spacing-top-small").click();
    cy.wait(1000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix")
      .children("#gastosEnvio.precio")
      .eq(1)
      .should("have.text", "150€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "167,1€");
    cy.get("a.close-items-20").click();

    /*cy.wait(1000)

    cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("1001").clear()
    cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("1001")
    cy.get('#a-autoid-1-announce').click()
    cy.wait(1000)
    cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','200€')
    cy.get('p#totalCompra.precio.orange').should('have.text','307,1€')
    cy.get('a.close-items-20').click()*/
  });
});
