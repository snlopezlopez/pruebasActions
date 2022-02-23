import { terminales } from "../../support/variables.js";

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

  it("Comprar terminal a plazos + Línea móvil + Fibra ", () => {
    //Añadimos terminales
    cy.get("a.arrowed.desktop").eq(0).click();
    cy.get(terminales.mobile2).click();
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();

    cy.wait(2000);

    cy.contains("TARIFAS").click();
    // cy.get('a.logo').click()

    cy.wait(1000);

    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.wait(1000);

    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();
    cy.get("a.cart:first").click();

    cy.wait(3000);

    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio").select("CL").should("contain", "CALLE");
    cy.get("input#address_name_envio").type("Burgos");
    cy.get("input#address_number_envio").type("5");
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
    cy.contains("TRAMITAR PEDIDO").click();

    cy.wait(1000);

    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();

    //Seleccionar Nuevo numero
    //cy.movilPostpagoPortabilidadPrepago()
    cy.wait(1000);
    cy.get("div.overlay").eq(0).click();
    cy.wait(1000);
    cy.get("#configPrepaidByInstallment").click();

    cy.get("[id^=portability_company_]")
      .eq(0)
      .select("Lowi")
      .should("contain", "Lowi");
    cy.get("div.overlay").eq(4).click();
    cy.get("[id^=telephone_]").eq(0).type("654111444");
    cy.get("[id^=okPorta_]").click({ force: true });
    cy.get("button#nextButton").click();

    cy.get("input#address_name").should("exist");

    cy.wait(1000);
  });
});
