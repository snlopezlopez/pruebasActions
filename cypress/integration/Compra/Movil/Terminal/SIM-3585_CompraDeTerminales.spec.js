context("Gastos en Cesta  móviles y terminales", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.wait(1000);
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Cliente Nuevo intenta comprar un terminal a plazos se muestra mensaje de error", () => {
    cy.wait(1000);

    cy.get("a#buttonMovil").click();
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);

    cy.wait(1000);
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);

    cy.get("input#checkPlazos_4028f3b272a7141b0173379be72d7834").click();
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();
    //cy.get('.content-shop').get('#item_phone_content_4028f3956addc1fb016adf3941253cc4').contains("AÑADIR A LA CESTA").click({force:true})
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();

    cy.get("div.overlay:first").click();
    cy.wait(2000);
    cy.contains(
      "Para comprar un móvil a plazos es necesario comprarlo con una portabilidad a contrato (si eres nuevo cliente) o tener al menos una línea de contrato con simyo (si ya eres cliente). Una línea de contrato por cada móvil a plazos, ya que van asociados"
    );

    cy.contains("ENTENDIDO").click();
  });

  it("Cliente nuevo realiza una portabilidad mas la compra de un terminal y se realiza la compra correctamente", () => {
    cy.wait(1000);

    cy.get("a#buttonMovil").click();
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);

    cy.wait(1000);
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);

    cy.get("input#checkPlazos_4028f3b272a7141b0173379be72d7834").click();
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();
    //cy.get('.content-shop').get('#item_phone_content_4028f3956addc1fb016adf3941253cc4').contains("AÑADIR A LA CESTA").click({force:true})
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.get("div.flex-row.justify_c").children("a.orangeButton").eq(1).click();
    cy.wait(1000);
    cy.get("div.overlay").eq(0).click();
    cy.wait(1000);
    cy.contains("ENTENDIDO").click();
    cy.get("[id^=portability_company_]")
      .eq(0)
      .select("Lowi")
      .should("contain", "Lowi");
    cy.get("div.overlay").eq(5).click();
    cy.get("[id^=telephone_]").eq(0).type("654111444");
    cy.get("[id^=ICC_]").eq(0).type("8934013371839502376");
    cy.get("[id^=okPorta_]").click({ force: true });
    cy.get("button#nextButton").click();
    cy.wait(1000);
    cy.contains("> Datos del titular del contrato en simyo ");
  });

  it("Cliente inteta realizar compra de terminal a plazos y se realiza correctamente", () => {
    cy.login("01931279S", "01931279S");
    cy.wait(10000);

    cy.get("a.logo").click();
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);

    cy.get("input#checkPlazos_4028f3b272a7141b0173379be72d7834").click();
    cy.get("a.orangeButton.btn.medium.addCartShop").eq(0).click();

    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.contains("TRAMITAR PEDIDO").click();
    cy.wait(1000);
    cy.contains("SELECCIONA TU LÍNEA...").click();
    cy.contains("644991781").click();
    cy.wait(1000);
    cy.get("button.btn.orangeButton").click();
    cy.wait(2000);
    cy.contains("FINALIZAR LA COMPRA >>");
  });

  it("Cliente con linea de baja intenta comprar terminal con un nuimero nuevo y se le muestra mensaje de error", () => {
    cy.get("a#buttonMovil").click();
    //cy.get('#fixSlider').click(20,14,15)
    // 208.58,19)
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").click();

    cy.get("error").click();
  });
});
