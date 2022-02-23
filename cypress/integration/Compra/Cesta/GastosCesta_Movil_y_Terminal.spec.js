import { terminales } from "../../support/variables.js";

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

  it("Comprobar gastos 1 terminal y 1 línea", () => {
    cy.get("a#buttonMovil").click();
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);
    cy.get(".content-shop")
      .get(terminales.mobile2)
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    //cy.get('.content-shop').get('#item_phone_content_4028f3b272a7141b01733781d3e1780c').contains("AÑADIR A LA CESTA").click({force:true})
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "7€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "103€");
  });

  it("Comprobar gastos 11 terminales y 11 lineas", () => {
    cy.get("a#buttonMovil").click();
    cy.get("a#buttonAddTotalTarifa").click();
    cy.wait(1000);
    cy.contains("Todos los móviles").click({ force: true });
    cy.wait(1000);
    cy.get(".content-shop")
      .get(terminales.mobile2)
      .contains("AÑADIR A LA CESTA")
      .click({ force: true });
    //cy.get('.content-shop').get('#item_phone_content_4028f3b272a7141b01733781d3e1780c').contains("AÑADIR A LA CESTA").click({force:true})
    cy.wait(1000);
    cy.get("a.cart:first").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "7€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "103€");

    cy.get(".select").eq(1).click();
    cy.wait(1000);
    cy.get("#dropdown2_10.a-dropdown-link").eq(1).click();
    cy.get("input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden")
      .eq(1)
      .type("11");
    cy.get("div.summary.purchase").click();
    cy.get(
      ":nth-child(2) > .cart-item-content > .cart-item-units > :nth-child(1) > .update-input > .a-spacing-top-small"
    ).click();
    cy.wait(1500);
    cy.get(".select").eq(0).click();
    cy.wait(1000);
    cy.get("#dropdown2_10.a-dropdown-link").eq(0).click();
    cy.get("input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden")
      .eq(0)
      .type("11");
    cy.get(
      ":nth-child(1) > .cart-item-content > .cart-item-units > :nth-child(1) > .update-input > .a-spacing-top-small"
    ).click();
    cy.wait(1000);
    cy.get("a.close-items-20").click();
    cy.wait(2000);
    cy.get("div.summary.purchase")
      .get("div.row.clearfix.gastos")
      .children("#gastosEnvio.precio")
      .should("have.text", "17€");
    cy.get("p#totalCompra.precio.orange").should("have.text", "1088€");
  });

  /*
     it('Comprobar gastos desde 101 hasta 9.999 tarifas móviles', ()=>{

       cy.get('a#buttonMovil').click()
       //cy.get('#fixSlider').click(20,14,15)
        // 208.58,19)
       cy.get('a#buttonAddTotalTarifa').click() 
       cy.wait(1000)     
       cy.get('a.cart:first').click()
       cy.wait(2000)
       cy.get('div.summary.purchase').get('div.row.clearfix.gastos').children('#gastosEnvio.precio').should('have.text','7€')
       cy.get('p#totalCompra.precio.orange').should('have.text','7€')
 
       cy.get('.select').click()
       cy.wait(1000)
       cy.get('#dropdown2_10').click()
       cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("101")
       cy.get('#a-autoid-1-announce').click()
       cy.wait(1000)
       cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','150€')
       cy.get('p#totalCompra.precio.orange').should('have.text','167,1€')
       cy.get('a.close-items-20').click()

       /*cy.wait(1000)

       cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("1001").clear()
       cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("1001")
       cy.get('#a-autoid-1-announce').click()
       cy.wait(1000)
       cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','200€')
       cy.get('p#totalCompra.precio.orange').should('have.text','307,1€')
       cy.get('a.close-items-20').click()
 
       })*/
});
