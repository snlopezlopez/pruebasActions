context("Recargar Prepago", () => {
  beforeEach(() => {
    cy.visitSimyo();
    cy.login("644996219", "89671598");
    cy.then(() => {
      cy.get('div[id="showProgress"]').should("not.be.visible");
    });
  });

  Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it("Recarga de 5€)", () => {
    var saldoInicial;
    var saldoFinal;
    cy.get("#saldo_total")
      .within(() => {
        cy.get("span[class='subTitle']").then((saldo) => {
          saldoInicial = Number(saldo.text().split(" ")[0]);
        });
      })
      .then(() => {
        cy.get("span[class='title']")
          .contains("Recargas")
          .click({ force: true })
          .then(() => {
            cy.get("a[class='myRecharge ']")
              .contains("Recargar")
              .click({ force: true })
              .then(() => {
                cy.contains("Introduce en el cuadro el importe a recargar.");
                cy.get('[id="amount"]').type("5");
                cy.get('[id="recargar"]').click();
                cy.get('[id="aceptar"]')
                  .click()
                  .then(() => {
                    cy.get('div[id="showProgress"]').should("not.be.visible");
                    cy.get('div[class="popup-content"]')
                      .within(() => {
                        cy.get(
                          'a[class="close"][href="javascript:void(0);"]'
                        ).click({ multiple: true, force: true });
                      })
                      .then(() => {
                        cy.get("a[id='aAreaPersonal']").click();
                        cy.get("#saldo_total").within(() => {
                          cy.get("span[class='subTitle']").then((saldo) => {
                            saldoFinal = Number(saldo.text().split(" ")[0]);
                            expect(saldoInicial + 5).to.equal(saldoFinal);
                          });
                        });
                      });
                  });
              });
          });
      });
  });

  //Comprobacion VISA y Mastercard
  it("Comprobar VISA erronea", () => {
    cy.get("span[class='title']")
      .contains("Recargas")
      .click({ force: true })
      .then(() => {
        cy.get("a[class='myRecharge ']")
          .contains("Recargar")
          .click({ force: true })
          .then(() => {
            cy.get("a.cambiarTarjeta").click();
            cy.get("#amount").type("5");
            cy.get("select#creditCardTypeSelect")
              .select("01")
              .should("contain", "Visa");
            cy.get("#card_number1").click().type("1111");
            cy.get("#card_number2").click().type("1111");
            cy.get("#card_number3").click().type("1111");
            cy.get("#card_number4")
              .click()
              .type("1111")
              .then(() => {
                cy.get("select#creditCardMonthExpired")
                  .select("01")
                  .should("contain", "01");
                cy.get("select#creditCardYearExpired")
                  .select("22")
                  .should("contain", "22");
                cy.get("input#card_cvv").type("123");
                cy.get("#recargar")
                  .click()
                  .then(() => {
                    cy.get("small[id='card_number1-error']").should(
                      "contain",
                      "El tipo de tarjeta seleccionado no es correcto"
                    );
                  });
              });
          });
      });
  });

  it("Comprobar Mastercard erronea", () => {
    cy.get("span[class='title']")
      .contains("Recargas")
      .click({ force: true })
      .then(() => {
        cy.get("a[class='myRecharge ']")
          .contains("Recargar")
          .click({ force: true })
          .then(() => {
            cy.get("a.cambiarTarjeta").click();
            cy.get("#amount").type("5");
            cy.get("select#creditCardTypeSelect")
              .select("02")
              .should("contain", "Master Card");
            cy.get("#card_number1").click().type("1111");
            cy.get("#card_number2").click().type("1111");
            cy.get("#card_number3").click().type("1111");
            cy.get("#card_number4")
              .click()
              .type("1111")
              .then(() => {
                cy.get("select#creditCardMonthExpired")
                  .select("01")
                  .should("contain", "01");
                cy.get("select#creditCardYearExpired")
                  .select("22")
                  .should("contain", "22");
                cy.get("input#card_cvv").type("123");
                cy.get("#recargar")
                  .click()
                  .then(() => {
                    cy.get("small[id='card_number1-error']").should(
                      "contain",
                      "El tipo de tarjeta seleccionado no es correcto"
                    );
                  });
              });
          });
      });
  });
  /*it("Fallo al Recargar 10€ de Saldo Tarjeta Erronea", () => {
    cy.get("span[class='title']")
      .contains("Recargas")
      .click({ force: true })
      .then(() => {
        cy.get("a[class='myRecharge ']")
          .contains("Recargar")
          .click({ force: true })
          .then(() => {
            cy.get("a.cambiarTarjeta").click();
            cy.get("#amount").type("10");
            cy.get("select#creditCardTypeSelect")
              .select("01")
              .should("contain", "Visa");
            cy.get("#card_number1").click().type("1111", { delay: 200 });
            cy.get("#card_number2").click().type("1111", { delay: 200 });
            cy.get("#card_number3").click().type("1111", { delay: 200 });
            cy.get("#card_number4")
              .click()
              .type("1111", { delay: 200 })
              .then(() => {
                cy.get("select#creditCardMonthExpired")
                  .select("01")
                  .should("contain", "01");
                cy.get("select#creditCardYearExpired")
                  .select("22")
                  .should("contain", "22");
                cy.get("input#card_cvv").type("123");
                cy.get("#recargar")
                  .click()
                  .then(() => {
                    cy.get("small[id='card_number1-error']").should(
                      "contain",
                      "El tipo de tarjeta seleccionado no es correcto"
                    );
                  });
              });
          });
      });
  });*/
});
