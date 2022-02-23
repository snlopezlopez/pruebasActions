context("Paso 1 Tus Lineas", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(2000);

    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);
    cy.get(".content-shop")
      .get("#item_phone_content_4028f3b272a7141b01733781d3e1780c")
      .contains("AÑADIR A LA CESTA")
      .click();
    cy.wait(4000);
    cy.get("a.cart:first").click();
    //cy.get('div.cart-item-delete.flex-row.col-3.cart-item-delete.cart-item-delete-coverage').children().click()
    cy.wait(3000);
    //cy.get('span.desktop').eq(1).click()
    //cy.wait(3000)
    cy.contains("TRAMITAR PEDIDO").click({ force: true });
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprar linea contrato y numero nuevo ", () => {
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.movilPostpagoNumeroNuevo();
    cy.get("p#gastosEnvio.precio").should("contain", "7");
    cy.get("button#nextButton").click();

    //Datos nuevo cliente

    cy.get("select#identification_type_select")
      .select("02")
      .should("contain", "DNI");
    cy.get("input#document_number").type("37913690F");
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

    //Direccion

    cy.get("select#address_type").select("CL").should("contain", "CALLE");
    cy.get("input#address_name").type("Burgos");
    cy.get("input#address_number").type("7");
    cy.get("input#address_postalcode").type("28039");
    cy.get("input#address_city").type("Madrid");
    cy.get("select#address_province").select("28").should("contain", "Madrid");

    //Password
    cy.get("input#password").type("Pepe123456");
    cy.get("input#password_confirm").type("Pepe123456");

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    //cy.get('button#nextButton').click()

    //cy.get('[data-product-id="46"]').children('div.overlay').eq(0).click()
    //cy.get('[data-product-id="46"]').children('div.overlay').eq(2).click()
    // cy.get('select#portability_company_select_46').select('value="Movistar" class="operators" id="operators_46001" data-pos="0"')
    //cy.get('select:first').select('Movistar').should('have.value', 'Movistar')
    // <option value="Movistar" class="operators" id="operators_46001" data-pos="0">Movistar</option>
  });

  it("Comprar linea prepago portabilidad ", () => {
    cy.wait(3000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    //Selecciono Prepago
    cy.movilPortabilidadPrepago();
    cy.get("button#nextButton").click();
    cy.contains("> ¿ERES EL TITULAR DE LA LÍNEA QUE QUIERES PORTAR?");

    // cy.get('a.select-msisdn').eq(0).click()
    //Comprobamos la recarga de saldo 8€
    cy.get("p#recargarSaldo").should("contain", "8€");
    cy.get("button#nextButton").click();
  });

  it("Comprar linea prepago y numero nuevo ", () => {
    cy.wait(2000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    //Selecciono Prepago
    cy.get("div.overlay").eq(1).click();

    //Selecciono Numero Nuevo
    cy.get(".nuevo_numero_radio_row").eq(0).click();
    //cy.get('a.select-msisdn').eq(0).click()
    //Comprobamos la recarga de saldo 8€
    cy.get("p#recargarSaldo").should("contain", "8€");
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

    //Direccion

    cy.get("select#address_type").select("CL").should("contain", "CALLE");
    cy.get("input#address_name").type("Burgos");
    cy.get("input#address_number").type("7");
    cy.get("input#address_postalcode").type("28039");
    cy.get("input#address_city").type("Madrid");
    cy.get("select#address_province").select("28").should("contain", "Madrid");

    //Password
    cy.get("input#password").type("Pepe123456");
    cy.get("input#password_confirm").type("Pepe123456");

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    cy.get("button#nextButton").click();

    //Comprobaciones Recargas automáticas
    cy.get("div.overlay").eq(0).click();
    cy.get("select#recharge_monthly_options_select")
      .select("1")
      .should("contain", "01");
    cy.get("input#recarga").type("20.55");
    cy.get("input#titular").click();
    cy.contains("Por favor, revisa este campo");
    cy.get("div.overlay").eq(1).click();
    cy.get("select#balance").select("5.0").should("contain", "5");
    cy.get("input#recarga2").type("20.55");
    cy.get("input#titular").click();
    cy.contains("Por favor, revisa este campo");
  });
});
