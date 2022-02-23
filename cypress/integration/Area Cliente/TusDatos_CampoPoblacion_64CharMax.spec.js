context("Comprobar Limite MAX 64", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.wait(1000);
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar Poblacion en Tus Datos", () => {
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("a.cart:first").click();
    cy.wait(1000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(3000);
    cy.get(".flex-row.justify_c").children().eq(1).click();

    //Seleccionar nuevo numero
    cy.movilPostpagoNumeroNuevo();
    cy.get("button#nextButton").click();

    //Direccion

    cy.get("select#address_type").select("CL").should("contain", "CALLE");
    cy.get("input#address_name").type("Burgos");
    cy.get("input#address_number").type("7");
    cy.get("input#address_postalcode").type("35012");

    cy.get("input#address_city").type(
      "Esto son 65 caracteres para probar el maximo posible y permitidos"
    );
    cy.get("input#address_city").should(
      "have.value",
      "Esto son 65 caracteres para probar el maximo posible y permitido"
    );

    cy.get("div.overlay").eq(1).click();
    cy.get("input#address_city_envio").type(
      "Esto son 65 caracteres para probar el maximo posible y permitidos"
    );
    cy.get("input#address_city_envio").should(
      "have.value",
      "Esto son 65 caracteres para probar el maximo posible y permitido"
    );
  });
});
