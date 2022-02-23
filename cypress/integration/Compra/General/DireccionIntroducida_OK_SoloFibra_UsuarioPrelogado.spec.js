context(
  "Comprobar que los datos de direccion y movil se reflejan en AreaPersonal",
  () => {
    beforeEach(() => {
      cy.visitSimyo();
      //Añadimos dos lineas y un terminal
      cy.login("39519425C", "61265011");
      /*cy.get('.login').click()
      cy.get('#tab_login_user').type("37502984N")
      cy.get('#tab_login_password').type("63041738")
      cy.contains("ENTRAR").click()*/
      cy.wait(10000);

      cy.get("a.logo").click();
      cy.get("a#buttonFibra").click();
      cy.get("a.grayButton.btn.addCart").eq(0).click();

      cy.get("a.cart:first").click();

      cy.wait(3000);
    });
    Cypress.on("uncaught:exception", () => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });

    it("Comprar fibra Usuario Prelogado ", () => {
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
      // cy.get('input#email_address').type("simyo@paradigmadigital.com")
      //cy.get('input#email_address_confirm').type("simyo@paradigmadigital.com")

      cy.get("#contact_phone1").type("666555223").clear();
      cy.get("#contact_phone1").type("666555223");
      cy.get("#changeBilling").click();

      //Direccion

      cy.get("select#address_type").select("CL").should("contain", "CALLE");
      cy.get("input#address_name").type("Burgos");
      cy.get("input#address_number").type("7");
      cy.get("input#address_postalcode").type("28039");
      cy.get("input#address_city").type("Madrid");
      cy.get("select#address_province")
        .select("28")
        .should("contain", "Madrid");

      //Aceptar Condiciones
      cy.get("div.overlay").eq(0).click();
      cy.get("button#nextButton").click();

      cy.get("a.logo").click();
      cy.get("#aAreaPersonal").click();
      cy.wait(1000);

      //cy.get('li.item-mas').eq(4).click()
      //cy.get('.myData ').click()
      cy.contains("Datos personales ").get("#openDatos").click();
      cy.get("input#contact_phone1")
        .contains("666555223")
        .should("contain", "666555223");

      cy.get("a#openDireccion").click();
      cy.get("input#address_name")
        .contains("Burgos")
        .should("contain", "Burgos");
      cy.get("input#address_number").contains("7").should("contain", "7");
      //cy.contains("> Datos de domiciliación")

      //Continuar
      //cy.get('button#nextButton').click()

      //Ok compra
      //cy.contains("¡SÓLO TE QUEDA UN PASO!")
    });
  }
);
