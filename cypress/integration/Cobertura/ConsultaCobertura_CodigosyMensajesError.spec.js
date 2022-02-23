context("Comprobamos los errores al consultar la cobertura de fibra", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();

    cy.get("a.cart:first").click();

    cy.wait(3000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Error 404 cuando tiene algun error la dirección de consulta", () => {
    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio")
      .select("AC2")
      .should("contain", "ACCESO");
    cy.get("input#address_name_envio").type("aasasasasa");
    cy.get("input#address_number_envio").type("333");
    cy.get("input#address_postalCode_envio").type("28022");
    cy.get("input#address_city_envio").type("Madrid");
    cy.get("select#address_province_envio")
      .select("28")
      .should("contain", "Madrid");

    cy.contains("Continuar ").click();
    cy.wait(1000);

    cy.contains(
      "Vaya, no hemos podido encontrar tu dirección para ver si tenemos cobertura. Por favor intenta de nuevo la consulta de cobertura, revisando dirección, número, provincia, código postal...a la segunda va la vencida ;) (Error: 404)"
    );
  });

  it("Error 500 error en consulta de cobertura", () => {
    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio").select("CL").should("contain", "CALLE");
    cy.get("input#address_name_envio").type("CASTELLÓ");
    cy.get("input#address_number_envio").type("47");
    cy.get("input#address_postalCode_envio").type("46740");
    cy.get("input#address_city_envio").type("VALENCIA");
    cy.get("select#address_province_envio")
      .select("46")
      .should("contain", "Valencia");
    cy.contains("Continuar ").click();
    cy.wait(1000);
    cy.get("div.switch:first").click({ force: true });

    cy.contains("Continuar ").click();
    cy.contains("Error: 404");
  });

  it("Opps no hay fibra", () => {
    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio")
      .select("AC2")
      .should("contain", "ACCESO");
    cy.get("input#address_name_envio").type("Burgos");
    cy.get("input#address_number_envio").type("1");
    cy.get("input#address_postalCode_envio").type("28039");
    cy.get("input#address_city_envio").type("Madrid");
    cy.get("select#address_province_envio")
      .select("28")
      .should("contain", "Madrid");
    cy.contains("Continuar ").click();
    cy.wait(1000);
    cy.get("div.switch:first").click({ force: true });

    cy.contains("Continuar ").click();
    cy.wait(2000);
    cy.get("div.overlay").eq(0).click({ force: true });
    cy.contains("CONSULTAR").click();

    cy.wait(1000);
    cy.contains("Vaya, no tenemos fibra en tu dirección.");
  });
});
