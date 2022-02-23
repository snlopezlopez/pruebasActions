describe("Comprobamos las cookies", () => {
  //ckgdrpinfo -> Indica si se muestra el banner
  //ckgdrp -> variables de la cookie

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });
  it("Cookies aceptadas", () => {
    cy.visit("http://pre2-www.simyo.es/");
    cy.get("#aceptarCookies").click();

    cy.getCookie("ckgdrpinfo")
      .should("have.property", "value", "false-2")
      .then(() => {});

    cy.getCookie("ckgdrp")
      .should("have.property", "value", "true-true-true")
      .then(() => {});
  });

  it("Configurando las Cookies false-false-false", () => {
    cy.visit("http://pre2-www.simyo.es/");
    //cy.get('[id=aceptarCookies]').click()
    cy.get("#configurarCookies").click();
    cy.get("#buttonGuardarConfigCookies").click();
    cy.getCookie("ckgdrpinfo")
      .should("have.property", "value", "false-2")
      .then(() => {});

    cy.getCookie("ckgdrp")
      .should("have.property", "value", "false-false-false")
      .then(() => {});
  });

  it("Configurando las Cookies true-false-true", () => {
    cy.visit("http://pre2-www.simyo.es/");
    //cy.get('[id=aceptarCookies]').click()
    cy.get("#configurarCookies").click();

    cy.get(".group-config-cookie").children("div.switchWrapper").eq(0).click();
    cy.get(".group-config-cookie").eq(2).children("div.switchWrapper").click();
    cy.wait(1000);

    cy.get("#buttonGuardarConfigCookies").click();

    cy.getCookie("ckgdrpinfo")
      .should("have.property", "value", "false-2")
      .then(() => {});

    cy.getCookie("ckgdrp")
      .should("have.property", "value", "true-false-true")
      .then(() => {});
  });
});
