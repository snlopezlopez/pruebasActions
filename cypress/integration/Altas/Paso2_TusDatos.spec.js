context("Paso 2 Validacion de datos de usuario", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos 1 linea
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(3000);

    cy.get("a.cart:first").click();
    //cy.get('.cart-item-delete.col-3').children().click()
    cy.wait(3000);

    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(3000);
    cy.get('[href="javascript:notUserFixedSubmit();"]').click();

    //Seleccionar nuevo numero
    cy.movilPostpagoNumeroNuevo();
    cy.get("button#nextButton").click();
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  //TODO: Dividir validacion del dni en dos tests diferentes
  it("Validamos DNI - Letra Incorrecta", () => {
    cy.get("select#identification_type_select")
      .select("02")
      .should("contain", "DNI");
    cy.get("input#document_number").type("73364211D");
    cy.get("input#firstname").click();
    cy.contains("El número de documento no tiene un formato válido");
  });

  it("Validamos DNI - < 9 dígitos", () => {
    cy.get("select#identification_type_select")
      .select("02")
      .should("contain", "DNI");
    cy.get("input#document_number").type("218371G");
    cy.get("input#firstname").click();
    cy.contains("El número de documento no tiene un formato válido");
  });

  it("Validamos DNI - sin letra", () => {
    cy.get("select#identification_type_select")
      .select("02")
      .should("contain", "DNI");
    cy.get("input#document_number").type("21837147");
    cy.get("input#firstname").click();
    cy.contains("El número de documento no tiene un formato válido");
  });

  /*it("Validamos Nombre y Apellido ", () => {
    cy.get("input#firstname").type("1Pepe");
    cy.get("input#lastname1").type("Pé4rez");
    cy.get("input#firstname").click();
    cy.contains("Introduce un nombre válido");
    cy.contains("Introduce un apellido válido");
  });

  it("Validamos E-Mail ", () => {
    cy.get("input#email_address").type("simyoparadigmadigital.com");
    cy.get("input#email_address_confirm").click();
    cy.get("input#firstname").click();
    cy.contains(
      "El campo email debe ser una dirección de correo electrónico válida"
    );
    cy.contains("Por favor, repite tu email");
  });

  it("Validamos Código Postal con Provincia", () => {
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
    cy.get("input#address_postalcode").type("35012");
    cy.get("input#address_city").type("Madrid");
    cy.get("select#address_province").select("28").should("contain", "Madrid");

    //Password
    cy.get("input#password").type("Pepe123456");
    cy.get("input#password_confirm").type("Pepe123456");

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    cy.get("button#nextButton").click();
    cy.contains(
      "El código postal que nos has facilitado no corresponde con la provincia."
    );
  });

  it("Validamos que sea un Móvil ", () => {
    cy.get("input#contact_phone1").type("928335544");
    cy.get("input#firstname").click();
    cy.contains("El teléfono no es válido, debe ser un teléfono móvil");
  });

  it("Validamos rellenar todos los campos obligatorios y aceptar condiciones", () => {
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
    cy.get("button#nextButton").click();

    cy.contains("Parece que algo no ha ido bien");
    cy.contains("Por favor, introduce tu tipo de documento.");
    cy.contains("Por favor, acepta las condiciones de contratación.");
  });

  it("Validamos forzar normalizador", () => {
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
    cy.get("input#address_name").type("Burgossss");
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

    cy.wait(1000);
    cy.contains(" Confirma tu dirección de envío");
    cy.get("div.overlay:first").click();
    cy.get("button#nextButton").click();
  });

  it("Validamos Mayoría de Edad", () => {
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
    cy.get("select#birthdate_day").select("30").should("contain", "30");
    cy.get("select#birthdate_month")
      .select("11")
      .should("contain", "Diciembre");
    cy.get("select#birthdate_year").select("2002").should("contain", "2002");

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
    cy.contains("Debes ser mayor de edad para hacerte de simyo.");
  });

  it("Validamos reglas del password", () => {
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
    cy.get("select#birthdate_month")
      .select("11")
      .should("contain", "Diciembre");
    cy.get("select#birthdate_year").select("1990").should("contain", "1990");

    //Direccion

    cy.get("select#address_type").select("CL").should("contain", "CALLE");
    cy.get("input#address_name").type("Burgos");
    cy.get("input#address_number").type("7");
    cy.get("input#address_postalcode").type("28039");
    cy.get("input#address_city").type("Madrid");
    cy.get("select#address_province").select("28").should("contain", "Madrid");

    //Password
    cy.get("input#password").type("12345");
    cy.get("input#password_confirm").click();
    cy.contains("La clave debe tener una longitud entre 6 y 64 caracteres");
    cy.get("input#password_confirm").type("234567");
    cy.get("input#password").click();
    cy.contains("Los campos clave y repite tu clave deben de ser idénticos.");
  });*/
});
