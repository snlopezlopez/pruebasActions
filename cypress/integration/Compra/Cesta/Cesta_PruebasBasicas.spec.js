import { terminales } from "../../../support/variables.js";

context("Cesta - Pruebas básicas", () => {
  beforeEach(() => {
    cy.visitSimyo();
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Añadimos un producto a la cesta", () => {
    cy.get("a#buttonMovil").click();
    //cy.get('#fixSlider').click(20,14,15)
    // 208.58,19)
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").contains("1");
  });

  it("Añadimos 2 productos a la cesta", () => {
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    // cy.get('#intSlider').click(313.61,15)
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(2000);
    cy.get("#intSlider").click(156.8, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("a.cart").contains("2");
  });

  it("Añadimos 3 y Eliminamos 1 ", () => {
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("#intSlider").click(156.8, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("#intSlider").click(261.34, 15);
    cy.get("#llamSlider").click(235.22, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(2000);
    cy.get("a.cart").contains("3");
    cy.get("a.cart:first").click();
    cy.get(
      ":nth-child(2) > .cart-item-content > .cart-item-delete > .align-self_c > .desktop"
    ).click();
    //cy.get('a.align-self_c:first').click()
    cy.wait(2000);
    cy.get("a.cart").contains("2");
  });

  it("Añadimos 1 linea y 5 móviles para comprobar limite de 4/Línea ", () => {
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(2000);
    cy.contains("Todos los móviles").click({ force: true });
    //cy.visit('https://pre2-www.simyo.es/simyo/telefonia-movil/telefonos-libres.htm')
    //cy.get('a.arrowed:first').click()
    cy.wait(2000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3b272a7141b01733781d3e1780c")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(2000);
    cy.get(".content-shop")
      .get("#item_phone_content_402857bb6c282c65016c28ea417a00d2")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(2000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3c074977d5d01749b621f2f0077")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(2000);
    cy.get(".content-shop")
      .get("#item_phone_content_402857bb6c282c65016c28ea417a00d2")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(2000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3c074977d5d01749b621f2f0077")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(4000);
    cy.get("a.cart").contains("6");
    cy.get("a.cart:first").click();
    cy.contains("De momento solo permitimos comprar 4 móviles con pago único");
    cy.contains("ENTENDIDO").click();
  });
  it("Añadimos 1 movil y comprobamos Limite de al menos 1 linea al comprar un movil", () => {
    cy.wait(1000);
    //cy.get('a.arrowed:first').click()
    //cy.visit('https://pre2-www.simyo.es/simyo/telefonia-movil/telefonos-libres.htm')
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3c074977d5d01749b621f2f0077")
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    cy.wait(2000);
    cy.get("a.cart").contains("1");
    cy.get("a.cart:first").click();
    cy.contains(
      "Para comprar un móvil tienes que ser cliente de simyo o elegir una tarifa"
    );
    cy.get("#buttonCloseCart").click();
  });
  it("Comprar Ya de 1 movil y comprobamos Limite de al menos 1 linea al comprar un movil", () => {
    cy.wait(1000);
    // cy.get('a.arrowed:first').click()
    //cy.visit('https://pre2-www.simyo.es/simyo/telefonia-movil/telefonos-libres.htm')
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3c074977d5d01749b621f2f0077")
      .contains("COMPRAR YA")
      .click({ force: true });
    cy.wait(2000);
    cy.contains(
      "Para comprar un móvil tienes que ser cliente de simyo o elegir una tarifa"
    );
    cy.get("#buttonCloseCart").click();
  });

  it("Comprar movil a plazos sin seleccionar tarifa", () => {
    cy.contains("Todos los móviles")
      .click({ force: true })
      .then(() => {
        cy.get(terminales.mobile2).within(() => {
          cy.get("input[value='plazos']").check({ force: true });
          cy.get("a[title='añadir a cesta']").click();
        });
        cy.get("a.cart").contains("1");
        cy.get("a.cart:first").click();
        cy.get("div[class='popup-content']").should(
          "contain",
          "Para comprar un móvil a plazos tienes que comprar también líneas de contrato con portabilidad."
        );
        cy.get("#buttonCloseCart").click();
      });
  });
});
