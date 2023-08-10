import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('Gebruiker navigeert naar de {string} pagina', (pagina: string) => {
    cy.visit(pagina);
});

Given('Gebruiker klikt op de Terug knop bij Digidok', () => {
    cy.contains('button', 'TERUG').click();
});

Given('Gebruiker klikt op de Terug knop bij Consult', () => {
    cy.get('[data-test="vragenlijst-back-button"]').click();
});
