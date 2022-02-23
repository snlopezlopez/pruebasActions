context("Comprobar las Facturas", () => {
  beforeEach(() => {
    cy.visit("https://www.simyo.es/");
    cy.contains(" ACEPTAR").click();
    cy.get('[class="curtain-inner"]').children().click();
    /*cy.get('[id="areaPersonal"]').click()
        cy.get('[id="tab_login_user"]').type("jrberenguer")
        cy.get('[id="tab_login_password"]').type("Paradigma1")
        cy.contains("ENTRAR").click()*/
    cy.login("jrberenguer", "Paradigma1");
    cy.wait(10000);
  });

  it("Ver Factura", () => {
    //cy.get('a.close').click()
    cy.get("a.myBills ").click({ force: true });
    cy.get("td.pdf").contains("mayo 2020");
    cy.request({
      url: "https://www.simyo.es/simyo/privatearea/customer/download-invoice?invoiceID=H2020011110601512&invoiceNO=2010120-00316412",
      encoding: "binary",
    }).then((response) => {
      const fileName = "test";
      const filePath = "temp/" + fileName + ".pdf";

      cy.writeFile(filePath, response.body, "binary");
    });
  });
});
