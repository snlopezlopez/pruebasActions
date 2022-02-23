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

  it("Comprobar se muestra +info para Linea Menor de 10€ prepago No hay que recargar", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(177, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.wait(2000);

    cy.get("a.cart:first").click();
    //cy.get('.cart-item-delete.col-3').children().click()

    cy.wait(3000);

    cy.contains("TRAMITAR PEDIDO").click({ force: true });
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.get("div.overlay").eq(1).click();

    cy.wait(1000);
    cy.get("#info_num").click();
    cy.get("#info_numero_telefono_tooltip > h4").contains(
      "Información sobre portabilidad"
    );

    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .moreInfo > img"
    ).click();
    cy.wait(1000);
    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .tooltip > :nth-child(3)"
    ).contains("de regalo de bienvenida a simyo");
    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .moreInfo > img"
    ).click();

    cy.get(
      ":nth-child(4) > .flex-row > .tooltip-container > .moreInfo > img"
    ).click();
    cy.get(
      ":nth-child(4) > .flex-row > .tooltip-container > .tooltip > p"
    ).contains("La tarjeta SIM de simyo");
  });

  it("Comprobar se muestra +info para Linea Mayor de 10€ prepago Si hay que recargar", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.wait(2000);

    cy.get("a.cart:first").click();
    // cy.get('.cart-item-delete.col-3').children().click()

    cy.wait(3000);

    cy.contains("TRAMITAR PEDIDO").click({ force: true });
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.get("div.overlay").eq(1).click({ force: true });
    cy.wait(2000);

    cy.wait(1000);
    cy.get("#info_num").click();
    cy.get("#info_numero_telefono_tooltip > h4").contains(
      "Información sobre portabilidad"
    );

    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .moreInfo > img"
    ).click();
    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .tooltip > :nth-child(3)"
    ).contains("de regalo de bienvenida a simyo");
    cy.get(
      ".shopping_cart > :nth-child(1) > .tooltip-container > .moreInfo > img"
    ).click();

    cy.get(
      ":nth-child(4)> .flex-row > .tooltip-container > .moreInfo > img"
    ).click();
    cy.get(
      ":nth-child(4) > .flex-row > .tooltip-container > .tooltip > p"
    ).contains("La tarjeta SIM de simyo");
  });
});
