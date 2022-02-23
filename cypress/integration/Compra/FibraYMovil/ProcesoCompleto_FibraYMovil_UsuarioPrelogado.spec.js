context("Proceso compra fibra", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.login("01931279S", "01931279S");
    cy.wait(10000);

    cy.get("a.logo").click();

    cy.get("#buttonFixedAddTotalTarifa").click();

    cy.get("a.cart:first").click();

    cy.wait(3000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprar fibra Usuario Prelogado ", () => {
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

    //Seleccionar Nuevo numero
    cy.movilPostpagoNumeroNuevo();
    cy.get("button#nextButton").click();

    cy.wait(1000);

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    cy.get("button#nextButton").click();
    cy.contains("> Datos de domiciliación");

    // Datos Bancarios //Número: 4548 8120 4940 0004 Tipo de tarjeta: Visa  Caducidad: 12/20    CVV: 123

    cy.rellenarTarjetaCredito();

    //Continuar
    //cy.get('button#nextButton').click()

    //Ok compra
    //cy.contains("¡SÓLO TE QUEDA UN PASO!")
  });
});
