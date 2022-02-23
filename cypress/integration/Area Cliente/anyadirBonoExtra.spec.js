context("Añadir Bono Extra linea de contrato", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.login("37502984N", "63041738");
    cy.wait(10000);
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Añadimos un bono de 100Mb", () => {
    cy.get("a.myBonus").click({ force: true });
    cy.get(".switchWrapper").first().click();
    cy.get('[id="lo_quiero"]').click();
    cy.contains("¿Quieres contratar un bono extra de 100MB ");
    cy.get('[id="guardar"]').click();
    cy.wait(2000);
    cy.contains("¡Misión cumplida!");
    cy.contains("Acabas de contratar aquí tu super bono");
  });
});
