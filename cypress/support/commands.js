// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

//const variables = require("../support/variables")
// METODOS COMUNES A LOS TEST

// Funciones de acceso

import { tipoTarjetaCredito } from "./variables.js";

Cypress.Commands.add("visitSimyo", () => {
  cy.visit(`${Cypress.env("web_baseUrl")}`).then(() => {
    cy.get("[id=aceptarCookies]").click();
    //Comentar en caso de no estar activada publicidad al acceder
    //cy.get('[class="curtain-inner"]').children().click()
  });
});

Cypress.Commands.add("visitSimyoResponsive", () => {
  //PRE
  //cy.visit(variables.entornos.pre)
  cy.visit(`${Cypress.env("web_baseUrl")}`);

  //Cambia el orden cuando hay publicidad activada

  //cy.get('[class="curtain-inner"]').children().click()
  cy.contains(" ACEPTAR").click();
});

//Login
Cypress.Commands.add("login", (username, password) => {
  cy.get("#areaPersonal").click();
  cy.get("#tab_login_user").type(username);
  cy.get("#tab_login_password").type(password);
  cy.get("button#button").click();
});

//Generador de DNI
Cypress.Commands.add("generateDni", () => {
  function formatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
      r = "0" + r;
    }
    return r;
  }

  function charDNI(dni) {
    var chain = "TRWAGMYFPDXBNJZSQVHLCKET";
    var pos = dni % 23;
    var letter = chain.substring(pos, pos + 1);
    return letter;
  }

  var num = Math.floor(Math.random() * 100000000);
  var sNum = formatNumberLength(num, 8);
  return sNum + charDNI(sNum);
});

//Funciones para pagos

Cypress.Commands.add("rellenarTarjetaCredito", function (creditCard) {
  cy.get("input#titular").type(creditCard.user);
  cy.get("select#creditCardTypeSelect")
    .select(tipoTarjetaCredito[creditCard.type])
    .should("contain", creditCard.type);
  cy.get("input#card_number1").type(creditCard.num1);
  cy.get("input#card_number2").type(creditCard.num2);
  cy.get("input#card_number3").type(creditCard.num3);
  cy.get("input#card_number4").type(creditCard.num4);
  cy.get("select#card_expiration_month")
    .select(creditCard.expDate_Month)
    .should("contain", creditCard.expDate_Month);
  cy.get("select#card_expiration_year")
    .select(creditCard.expDate_Year)
    .should("contain", creditCard.expDate_Year);
  cy.get("input#card_ccv").type(creditCard.cvv);
});

//Funciones para Movil

//Funcion que selecciona un numero nuevo de una linea de postpago o contrato
Cypress.Commands.add("movilPostpagoNumeroNuevo", () => {
  cy.get("div.overlay:first").click();
  cy.wait(2000);
  //cy.get('[id^=nuevo_numero_radio_row_]').eq(0).click()
  cy.get(".nuevo_numero_radio_row").eq(0).click();
  //cy.get('a.select-msisdn').eq(0).click()
});

Cypress.Commands.add("rellenarDatosBancarios", function (bankAccount) {
  cy.get("input#entidad_label1").type(bankAccount.num1);
  cy.get("input#entidad_label2").type(bankAccount.num2);
  cy.get("input#entidad_label3").type(bankAccount.num3);
  cy.get("input#entidad_label4").type(bankAccount.num4);
});

//
Cypress.Commands.add("rellenarDatosDireccion", function (address) {
  cy.get("select#address_type")
    .find("option")
    .contains(address.type)
    .as("selectOption")
    .then(() => {
      cy.get("select#address_type").select(`${this.selectOption.text()}`);
    });
  cy.get("input#address_name").type(address.addressLine);
  cy.get("input#address_number").type(address.number);
  cy.get("input#address_postalcode").type(address.postalCode);
  cy.get("input#address_city").type(address.city);
  cy.get("select#address_province")
    .find("option")
    .contains(address.province)
    .as("selectOption")
    .then(() => {
      cy.get("select#address_province").select(`${this.selectOption.text()}`);
    });
});

//Funciones para Movil

//Funcion que selecciona un numero nuevo de una linea de postpago o contrato
Cypress.Commands.add("movilPostpagoNumeroNuevo", () => {
  cy.get("div.overlay:first").click();
  cy.wait(2000);
  //cy.get('[id^=nuevo_numero_radio_row_]').eq(0).click()
  cy.get(".nuevo_numero_radio_row").eq(0).click();
  //cy.get('a.select-msisdn').eq(0).click()
});

//Funcion que selecciona portabilidad de una linea de postpago o contrato a una de Prepago
Cypress.Commands.add("movilPostpagoPortabilidadPrepago", () => {
  cy.get("div.overlay").eq(0).click();
  cy.wait(1000);
  cy.get(".portabilidad_radio_row").eq(0).click();

  cy.wait(2000);

  cy.get("[id^=portability_company_]")
    .eq(0)
    .select("Lowi")
    .should("contain", "Lowi");
  cy.get("div.overlay").eq(5).click();
  cy.get("[id^=telephone_]").eq(0).type("654111444");
  cy.get("[id^=ICC_]").eq(0).type("8934013371839502376");
  cy.get("[id^=okPorta_]").click({ force: true });
});

//Funcion que realiza una portabilidad de una linea prepago
Cypress.Commands.add("movilPortabilidadPrepago", () => {
  cy.get("div.overlay").eq(1).click();
  cy.wait(1000);
  cy.get(".portabilidad_radio_row").eq(0).click();
  //cy.get('a.select-msisdn').eq(0).click()
  cy.wait(2000);
  cy.get("[id^=portabilitycompany]")
    .eq(0)
    .select("Lowi")
    .should("contain", "Lowi");
  cy.get("div.overlay").eq(5).click();
  cy.get("[id^=telephone]").eq(0).type("654111444");
  cy.get("[id^=ICC]").eq(0).type("89340133718395732856923562");
  //cy.get('[id^=ICC]').eq(0).type("8934013371839502376")

  cy.get("[id^=okPorta]").click({ force: true });
  cy.contains("El ICC introducido no es válido");
  cy.get("input[id^=ICC]").eq(0).clear();
  cy.get("[id^=ICC]").eq(0).type("8934013371839502376");
  cy.get("[id^=okPorta_]").click({ force: true });
});

//Selecciona un movil prepago y elige un numero nuevo
Cypress.Commands.add("movilPrepagoNumeroNuevo", () => {
  cy.get("div.overlay").eq(1).click();
  cy.wait(1000);
  cy.get("[id^=nuevo_numero_radio_row_]").click();
});
