import { Given } from '@badeball/cypress-cucumber-preprocessor';
beforeEach(() => {
    cy.fixture(`users/user`).then((userJson) => {
        cy.session([userJson.username], () => {
                cy.visit(Cypress.config('baseUrl'));
                cy.get('#username').type(userJson.username);
                cy.get('#password').type(userJson.password, { log: false });
                cy.get('#organisatie').type(userJson.organization);
                cy.get('#loginButton').click();
                cy.get('#trustDevice').click();
                //Pause to wait for manual SMS & definitive login
                cy.pause();
                //Verify the application has logged in to finish creating the session
                cy.contains('Dashboard').should('be.visible');
            },
            {
                cacheAcrossSpecs: true
            });
    })
    //Final visit to the application URL.
    cy.visit(Cypress.config('baseUrl'))
})

Given('Gebruiker ziet {string} op de pagina', (text: string) => {
    cy.contains(text).should("be.visible");
})

Given('Gebruiker start het behandeltraject', () => {
    cy.contains('a', 'Cliënten').click();

    cy.fixture(`users/user`).then((userJson) => {
        cy.get('#combinedsearch').type(userJson.clientachternaam);
        cy.get('#input-group-combinedsearch').within(() => {
            cy.get('button').click();
        });
    });

    cy.fixture(`users/user`).then((userJson) => {
        cy.contains('h2', userJson.behandeltraject).find('button').invoke('attr', 'data-monitor-program-id').then((dataID) => {
            cy.visit(`/index.cfm?event=dspClientOverzichtQuickStart&monitorProgramID=${dataID}`);
        });
    });

    cy.get('i[data-original-title="Deze meting direct afnemen"]').invoke('attr', 'onclick').then((onclick) => {
        var metingId = onclick.substring(
            onclick.indexOf("('") + 2,
            onclick.indexOf("',")
        );
        cy.log(metingId.toString());
        cy.visit(`https://meting.monitoring.viplive.nl/?metingId=${metingId}`)
    });
});