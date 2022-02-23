/// <reference types="cypress" />

context("Gastos en Cesta  Fibra y Movil", () => {
  beforeEach(() => {
    cy.visitSimyo();
  });
  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Comprobar gastos 1 Fibra + 1 Movil ", () => {
    cy.get("a#buttonFixedAddTotalTarifa")
      .click()
      .then(() => {
        cy.get("a.cart:first").click();
        cy.get("div.summary.purchase")
          .get("div.row.clearfix.gastos")
          .children("#gastosEnvio.precio")
          .should("have.text", "7€");
        cy.get("p#totalCompra.precio.orange").should("have.text", "7€");
      });
  });

  it("Comprobar gastos desde 1 a 10 Fibras + Movil Comprobamos los gastos fibra Cara vs Barata", () => {
    cy.get("a#buttonFixedAddTotalTarifa")
      .click()
      .then(() => {
        cy.get("a.cart:first").click();
        cy.get("div.summary.purchase")
          .get("div.row.clearfix.gastos")
          .children("#gastosEnvio.precio")
          .should("have.text", "7€");
        cy.get("p#totalCompra.precio.orange").should("have.text", "7€");
        cy.get(".select").eq(0).click();
        cy.get("#dropdown2_10").click();
        cy.get("div.summary.purchase").click();
        cy.get('[style="width:70px;"] > .update-input > .a-spacing-top-small')
          .click()
          .then(() => {
            cy.get('div[id="showProgress"]').should("not.be.visible");
            cy.get("div.summary.purchase")
              .get("div.row.clearfix")
              .children("#gastosEnvio.precio")
              .eq(1)
              .should("have.text", "62,91€");
            cy.get("p#totalCompra.precio.orange").should("have.text", "69,91€");
          });
      });
  });

  /*

        it('Comprobar gastos desde 4 hasta 10 Fibras', ()=>{

          cy.get('a#buttonFibra').click()
          cy.get('a.grayButton.btn.addCart').eq(0).click() 
          cy.wait(1000)      
          cy.get('a.cart:first').click()
          cy.wait(2000)
          cy.get('div.summary.purchase').get('div.row.clearfix.gastos').children('#gastosEnvio.precio').should('have.text','0€')
          cy.get('p#totalCompra.precio.orange').should('have.text','15€')
    
          cy.get('.select').click()
          cy.wait(1000)
          cy.get('#dropdown2_10').click()
          cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("4")
          cy.get('#a-autoid-1-announce').click()
          cy.wait(1000)
          cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','27,96€')
          cy.get('p#totalCompra.precio.orange').should('have.text','27,96€')
          
  
          cy.wait(1000)
          cy.get('.select').click()
          cy.get('#dropdown2_10').click()
        
          cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("10")
          cy.get('#a-autoid-1-announce').click()
          cy.wait(1000)
          cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','69,9€')
          cy.get('p#totalCompra.precio.orange').should('have.text','69,9€')
        
    
          })

          it('Comprobar gastos desde 11 hasta 100 Fibras', ()=>{

            cy.get('a#buttonFibra').click()
            cy.get('a.grayButton.btn.addCart').eq(0).click() 
            cy.wait(1000)      
            cy.get('a.cart:first').click()
            cy.wait(2000)
            cy.get('div.summary.purchase').get('div.row.clearfix.gastos').children('#gastosEnvio.precio').should('have.text','0€')
            cy.get('p#totalCompra.precio.orange').should('have.text','15€')
      
            cy.get('.select').click()
            cy.wait(1000)
            cy.get('#dropdown2_10').click()
            cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("11")
            cy.get('#a-autoid-1-announce').click()
            cy.wait(1000)
            cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','55€')
            cy.get('p#totalCompra.precio.orange').should('have.text','55€')
            
    
            cy.wait(1000)
            cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("100").clear()
            cy.get('input.a-input-text.a-width-small.sc-quantity-textfield.sc-hidden').type("100")
          
            cy.get('#a-autoid-1-announce').click()
            cy.wait(1000)
            cy.get('div.summary.purchase').get('div.row.clearfix').children('#gastosEnvio.precio').eq(1).should('have.text','500€')
            cy.get('p#totalCompra.precio.orange').should('have.text','500€')
          
      
            })*/
});
