context("Comprobamos el descuento de fibra Barata", () => {
  beforeEach(() => {
    cy.visitSimyo();
    //Añadimos dos lineas y un terminal
    cy.wait(1000);
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();
    //cy.get('#buttonAddTotalTarifa').click()

    cy.get("a.cart:first").click();
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Se añade Fibra y  movil mayor de 7€ para comprobar descuento de 7€", () => {
    cy.get("div.item-detail").contains("25,99€/MES");
    cy.get("a.logo").click();
    //cy.get('#fixSlider').click(0,15)
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("a.cart:first").click();
    cy.get("div.item-detail").contains("18,99€/MES");
    cy.contains(" menos! por tener una tarifa de móvil de más de 7€.");
  });

  it("Se añaden 2 Fibras y 1 movil para comprobar descuento a una fibra", () => {
    cy.get("div.item-detail").contains("25,99€/MES");
    cy.get("a.logo").click();
    cy.get("a#buttonFibra").click();
    cy.get("a.grayButton.btn.addCart").eq(0).click();
    cy.get("a.logo").click();
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(313.61, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.contains(" menos! por tener una tarifa de móvil de más de 7€.");
    cy.contains(
      "Si ahora o más adelante contratas una línea de movil de más de 7€, pagarás por la fibra 7"
    );
  });

  it("Se añade Fibra y  movil menor de 7€ para comprobar descuento de 7€", () => {
    cy.get("div.item-detail").contains("25,99€/MES");
    cy.get("a.logo").click();
    cy.get("a#buttonMovil").click();
    cy.get("#intSlider").click(100.75, 15);
    cy.get("#buttonAddTotalTarifa").click();
    cy.get("a.cart:first").click();
    //cy.get('div.item-detail').contains("18,99€/MES")
    cy.contains(
      "Si ahora o más adelante contratas una línea de movil de más de 7€, pagarás por la fibra 7"
    );
  });
});
