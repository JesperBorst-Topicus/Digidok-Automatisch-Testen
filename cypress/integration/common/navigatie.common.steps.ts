import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given('Gebruiker navigeert naar de {string} pagina', (pagina: string) => {
    cy.visit(pagina);
});

Given('Gebruiker klikt op de Terug knop', () => {
    cy.contains('button', 'TERUG').click();
});
