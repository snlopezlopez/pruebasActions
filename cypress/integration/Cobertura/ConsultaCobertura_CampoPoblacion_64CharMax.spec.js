context("Comprobar Consulta Cobertura", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.wait(1000);
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar Campo Poblacion en Consulta de Cobertura", () => {
    //Añadimos tarifa móvil y fibra
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();

    cy.get("a.cart:first").click();

    cy.wait(3000);

    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio").select("CL").should("contain", "CALLE");
    cy.get("input#address_name_envio").type("Burgos");
    cy.get("input#address_number_envio").type("7");
    cy.get("input#address_postalCode_envio").type("28039");
    cy.get("input#address_city_envio").type(
      "Esto son 65 caracteres para probar el maximo posible y permitidos"
    );
    cy.get("input#address_city_envio").should(
      "have.value",
      "Esto son 65 caracteres para probar el maximo posible y permitido"
    );
  });
});
