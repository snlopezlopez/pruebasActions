context("Proceso compra tarifa móvil", () => {
  beforeEach(() => {
    cy.visitSimyo();

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

    cy.movilPortabilidadPrepago();

    cy.get("button#nextButton").click();
    cy.wait(1000);
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

    //NO soy el titular
    cy.get("div.overlay").eq(1).click();
    cy.get("select#identification_type_select_different_holder-654111444")
      .select("02")
      .should("contain", "DNI");

    cy.get("input#document_number_different_holder-654111444").type("4779451G");
    cy.get("input#firstname_different_holder-654111444").click();
    cy.contains("El número de documento no tiene un formato válido");

    cy.get("select#nationality_select_different_holder-654111444")
      .select("1724")
      .should("contain", "España");
    cy.get("input#firstname_different_holder-654111444").type("1Alfredo");
    cy.get("input#lastname1_different_holder-654111444").type("Gon4zález");
    // cy.get('input#lastname2_different_holder-654111444').type("Pe55rez4")
    cy.get("input#firstname_different_holder-654111444").click();
    cy.contains("Introduce un nombre válido");
    cy.contains("Introduce un apellido válido");
  });
});
