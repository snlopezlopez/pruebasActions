context("Paso 1 Tus Lineas", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.wait(1000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Linea Menor de 10€ prepago No hay que recargar", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(177, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.wait(2000);

    cy.get("a.cart:first").click();
    //cy.get('.cart-item-delete.col-3').children().click()

    cy.wait(3000);

    cy.contains("TRAMITAR PEDIDO").click({ force: true });
    cy.wait(1000);
    cy.get("div.flex-row.justify_c")
      .children("a.orangeButton")
      .eq(1)
      .trigger("mouse.over")
      .click();
    cy.get("div.overlay").eq(1).click();

    cy.get("p#totalCompra.precio.orange").contains("7,00€");
  });

  it("Linea Mayor de 10€ prepago Si hay que recargar", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(400, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.wait(2000);

    cy.get("a.cart:first").click();
    // cy.get('.cart-item-delete.col-3').children().click()

    cy.wait(3000);

    cy.contains("TRAMITAR PEDIDO").click({ force: true });
    cy.wait(1000);
    cy.get("div.flex-row.justify_c")
      .children("a.orangeButton")
      .eq(1)
      .trigger("mouse.over")
      .click();
    cy.get("div.overlay").eq(1).click({ force: true });
    cy.wait(2000);

    cy.get("p#totalCompra.precio.orange").contains("11,00€");
  });

  it("Cliente Registrado compra fibra no tiene regalo", () => {
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();
    cy.wait(2000);

    cy.get("a.cart:first").click();
    //cy.get('.cart-item-delete.flex-row').children().eq(1).click()

    cy.wait(3000);

    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio").select("CL");
    cy.get("select#address_type_envio").should("contain", "CALLE");
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

    cy.contains("TRAMITAR PEDIDO").click({ force: true });
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(0).click();
    //cy.get('div.overlay').eq(1).click()

    cy.get("#login_user").type("644991617");
    cy.get("#login_password").type("33674085");
    cy.get("button.btn.orangeButton").eq(1).click();
    cy.get("p#totalCompra.precio.orange").contains("15");
  });
});
