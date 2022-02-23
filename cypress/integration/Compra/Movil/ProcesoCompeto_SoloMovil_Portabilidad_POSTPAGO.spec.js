context("Proceso compra tarifa móvil", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();

    cy.get("a.cart:first").click();

    cy.wait(3000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprar 1 linea Usuario nuevo ", () => {
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    //cy.contains("NO").click({force:true})
    cy.wait(1000);

    cy.movilPostpagoPortabilidadPrepago();
    cy.get("button#nextButton").click();
    cy.contains("> ¿ERES EL TITULAR DE LA LÍNEA QUE QUIERES PORTAR?");

    //8934013371839502376
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

    //numero amigo simyo
    cy.get("#mgmPromoCode").type("644991777");

    //Aceptar Condiciones
    cy.get("div.overlay").eq(0).click();
    cy.get("div.overlay").eq(5).click();
    cy.wait(1000);
    cy.get("button#nextButton").click();
    cy.wait(2000);

    // Datos Bancarios //Número: 4548 8120 4940 0004 Tipo de tarjeta: Visa  Caducidad: 12/20    CVV: 123

    cy.get(".row.clearfix.regalo")
      .children(".precio")
      .should("have.text", "10€");

    /*
      cy.get('input#titular').type("Pepe Pérez Pérez")
      cy.get('select#creditCardTypeSelect').select('01').should('be','Visa')
      cy.get('input#card_number1').type("4548")
      cy.get('input#card_number2').type("8120")
      cy.get('input#card_number3').type("4940")
      cy.get('input#card_number4').type("0004")
      cy.get('select#card_expiration_month').select('12').should('be','12')
      cy.get('select#card_expiration_year').select('20').should('be','20')
      cy.get('input#card_ccv').type("123")

      //Datos Domiciliacion   3582 2312 18 9674284354
      cy.get('input#entidad_label1').type("3582")
      cy.get('input#entidad_label2').type("2312")
      cy.get('input#entidad_label3').type("18")
      cy.get('input#entidad_label4').type("9674284354")
      //Continuar
      //cy.get('button#nextButton').click()

      //Ok compra
      //cy.contains("¡SÓLO TE QUEDAN DOS PASOS!")*/
  });
});
