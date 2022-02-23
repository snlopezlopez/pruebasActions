import { endpoints } from "../../support/variables";

describe(
  "Contratacion línea de fibra con resolucion de pantalla movil",
  { viewportWidth: 375, viewportHeight: 812 },
  () => {
    //iphone-7	375	667

    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    var baseURL = `${Cypress.env("web_baseUrl")}`;

    it("Responsive - Compra Fibra - Usuario Prelogado", () => {
      //Cypress.config('pageLoadTimeout',200000)
      //cy.viewport('iphone-x')
      cy.visitSimyo();

      cy.get("div#myPanelNavResponsive.miPanelNav").click();
      cy.get("strong.orange").click();
      //debugger
      cy.get("input#username").type("01931279S");
      cy.get("input#password").type("01931279S");
      // cy.login('644991617','33674085')
      cy.get("button#submitButton").click();
      cy.wait(1000);
      cy.get("a.logo").click();
      cy.get("a#buttonFibra").click();
      cy.get("a.grayButton.btn.addCart").eq(0).click();
      cy.wait(1000);

      cy.visit(baseURL + endpoints.cart);

      cy.wait(3000);

      cy.get("button.btn.orangeButton.coverage").click();
      cy.get("select#address_type_envio")
        .select("CL")
        .should("contain", "CALLE");
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

      //Aceptar Condiciones
      cy.get("div.overlay").eq(0).click();
      cy.get("button#nextButton").click();

      cy.contains("> Datos de domiciliación");
    });
  }
);
