context("Proceso compra tarifa móvil", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(221.25, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("#buttonAddTotalTarifa").click();

    cy.get("a.cart:first").click();

    cy.wait(3000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Añadimos dos lineas iguales una porta y una de contrato respectivamente y comprobamos que aparece correctamente tras eliminar 1", () => {
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();

    cy.wait(1000);
    cy.get(".overlay.gray").click();
    cy.wait(2000);
    //Línea 1
    cy.get("div.overlay").eq(4).click();
    cy.wait(1000);
    cy.get("#portabilidad_radio_row_8e0f9c-0").click();
    cy.get("[id^=portability_company_]")
      .eq(0)
      .select("Lowi")
      .should("contain", "Lowi");
    cy.get("div.overlay").eq(8).click();
    cy.get("[id^=telephone_]").eq(0).type("654111444");
    //cy.get('[id^=ICC_]').eq(0).type("8934013371839502376")
    cy.contains("OK").click();

    //Línea 2
    cy.get("div.overlay").eq(10).click();
    cy.wait(1000);
    cy.get("#nuevo_numero_radio_row_8e0f9c-1").click();

    cy.wait(2000);

    cy.get("button#nextButton").click();
    cy.wait(2000);
    cy.get("a.btn.outlineButton.shopping").click();
    cy.wait(2000);
    cy.get("#a-autoid-2").click();
    cy.get("#dropdown2_1").click();
    cy.wait(2000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.get("span#itemUnitMsisdn_0").should("have.text", "654111444");
  });

  it("Añadimos dos lineas iguales una linea de contrato y una de pospago respectivamente y comprobamos que aparece correctamente tras eliminar 1", () => {
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();

    cy.wait(1000);
    cy.get(".overlay.gray").click();
    cy.wait(2000);
    //Línea 1
    cy.get("div.overlay").eq(4).click();
    cy.wait(1000);
    cy.get("#nuevo_numero_radio_row_8e0f9c-0").click();

    //Línea 2
    cy.get("div.overlay").eq(10).click();
    cy.wait(1000);
    cy.get("#portabilidad_radio_row_8e0f9c-1").click();
    cy.get("#portability_company_select_8e0f9c-1")
      .eq(0)
      .select("Lowi")
      .should("contain", "Lowi");
    cy.get("div.overlay").eq(14).click();
    cy.get("#telephone_8e0f9c-1").type("654111444");
    //cy.get('[id^=ICC_]').eq(0).type("8934013371839502376")
    cy.get("button#okPorta_8e0f9c-1").click();

    cy.wait(2000);

    cy.get("button#nextButton").click();
    cy.wait(2000);
    cy.get("a.btn.outlineButton.shopping").click();
    cy.wait(2000);
    cy.get("#a-autoid-2").click();
    cy.get("#dropdown2_1").click();
    cy.wait(2000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.get("span#itemUnitMsisdn_0").should("not.exist", "654111444");
  });
});
