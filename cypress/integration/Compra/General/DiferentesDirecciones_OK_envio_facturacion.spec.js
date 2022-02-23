context("Comprobar con direccion de envio y facturacion diferentes", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.get("a.cart:first").click();
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar con direccion de envio y facturacion diferentes ", () => {
    cy.get("button.btn.orangeButton.coverage").click();
    cy.get("select#address_type_envio").select("CL").should("contain", "CALLE");
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

    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    //cy.contains("NO").click({force:true})
    cy.wait(1000);

    //Seleccionar Nuevo numero
    cy.movilPostpagoNumeroNuevo();
    cy.get("button#nextButton").click();

    //Datos nuevo cliente

    cy.get("select#identification_type_select")
      .select("02")
      .should("contain", "DNI");
    cy.generateDni().then((result) => {
      cy.get("input#document_number").type(result);
    });

    cy.get("input#firstname").type("Pepe");
    cy.get("input#lastname1").type("Perez");
    cy.get("input#email_address").type("simyo@paradigmadigital.com");
    cy.get("input#email_address_confirm").type("simyo@paradigmadigital.com");

    cy.get("input#contact_phone1").type("687608254");
    cy.get("select#nationality_select")
      .select("1724")
      .should("contain", "España");
    //Fecha
    cy.get("select#birthdate_day").select("1").should("contain", "01");
    cy.get("select#birthdate_month").select("0").should("contain", "Enero");
    cy.get("select#birthdate_year").select("1990").should("contain", "1990");

    //Enviar pedido a otra direccion
    cy.get(".address-switch").get("div.switch").eq(1).click();

    //Direccion

    cy.get("select#address_type_envio").select("CL").should("contain", "CALLE");
    cy.get("input#address_name_envio").type("Ronda de Valencia");
    cy.get("input#address_number_envio").type("8");
    cy.get("input#address_postalcode_envio").type("28012");
    cy.get("input#address_city_envio").type("Madrid");
    cy.get("select#address_province_envio")
      .select("28")
      .should("contain", "Madrid");

    //Password
    cy.get("input#password").type("Pepe123456");
    cy.get("input#password_confirm").type("Pepe123456");

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    cy.get("button#nextButton").click();
    cy.wait(1000);
    cy.get("div.overlay").eq(3).click();
    cy.get("button#nextButton").click();
    // Datos Bancarios //Número: 4548 8120 4940 0004 Tipo de tarjeta: Visa  Caducidad: 12/20    CVV: 123

    cy.rellenarTarjetaCredito();

    //Datos Domiciliacion   3582 2312 18 9674284354
    cy.get("input#entidad_label1").type("3582");
    cy.get("input#entidad_label2").type("2312");
    cy.get("input#entidad_label3").type("18");
    cy.get("input#entidad_label4").type("9674284354");
    //Continuar
    cy.get("button#nextButton").click();

    cy.get(".totalAddress-item:first").contains("Ronda de Valencia");
    cy.get(".totalAddress-item").eq(1).contains("BURGOS");
  });
});
