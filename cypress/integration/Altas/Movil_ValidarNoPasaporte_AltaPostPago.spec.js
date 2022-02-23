import { documentoID } from "../../support/variables.js";

context("Proceso compra tarifa móvil", () => {
  beforeEach(function () {
    cy.fixture("PepePerez").then(function (user) {
      this.user = user;
    });
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("a.cart:first").click();
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprar 1 linea Usuario nuevo ", function () {
    cy.contains("TRAMITAR PEDIDO").click();
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();

    //Seleccionar Nuevo numero
    cy.movilPostpagoNumeroNuevo();
    cy.get("button#nextButton").click();

    //Datos nuevo cliente

    //validamos que no existe la opcion 03 Pasaporte
    cy.get("select#identification_type_select").should(
      "not.have.value",
      documentoID.Pasaporte
    );
    //Seleccionamos DNI
    cy.get("select#identification_type_select").select(documentoID.Dni);
    cy.generateDni().then((result) => {
      cy.get("input#document_number").type(result);
    });

    cy.get("input#firstname").type(this.user.name);
    cy.get("input#lastname1").type(this.user.surname);
    cy.get("input#email_address").type(this.user.email);
    cy.get("input#email_address_confirm").type(this.user.email);

    cy.get("input#contact_phone1").type(this.user.contactPhone);
    cy.get("select#nationality_select")
      .find("option")
      .contains(this.user.nationality)
      .as("selectOption")
      .then(() => {
        cy.get("select#nationality_select").select(
          `${this.selectOption.text()}`
        );
      });

    //Fecha Nacimiento
    cy.get("select#birthdate_day")
      .find("option")
      .contains(this.user.birthDate.day)
      .as("selectOption")
      .then(() => {
        cy.get("select#birthdate_day").select(`${this.selectOption.text()}`);
      });
    cy.get("select#birthdate_month")
      .find("option")
      .contains(this.user.birthDate.month)
      .as("selectOption")
      .then(() => {
        cy.get("select#birthdate_month").select(`${this.selectOption.text()}`);
      });
    cy.get("select#birthdate_year")
      .find("option")
      .contains(this.user.birthDate.year)
      .as("selectOption")
      .then(() => {
        cy.get("select#birthdate_year").select(`${this.selectOption.text()}`);
      });

    //Direccion
    cy.rellenarDatosDireccion(this.user.address);

    //Password
    cy.get("input#password").type(this.user.password);
    cy.get("input#password_confirm").type(this.user.password);

    //Aceptar Condiciones
    cy.get("div.overlay").eq(2).click();
    cy.get("button#nextButton").click();

    // Datos Bancarios //Número: 4548 8120 4940 0004 Tipo de tarjeta: Visa  Caducidad: 12/20    CVV: 123
    cy.rellenarTarjetaCredito(this.user.creditCard);

    //Datos Domiciliacion   3582 2312 18 9674284354
    cy.rellenarDatosBancarios(this.user.bankAccount);
    //Continuar
    cy.get("button#nextButton").click();

    //Ok compra
    cy.contains("¡SÓLO TE QUEDAN DOS PASOS!");
  });
});
