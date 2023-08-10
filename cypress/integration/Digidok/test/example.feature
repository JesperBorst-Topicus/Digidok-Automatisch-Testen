Feature: Test

    Background:
        * Gebruiker navigeert naar de "" pagina
        * Gebruiker "sandraTD" logt in bij Digidok
        * Gebruiker pauzeert de test
        ## Vul ontvangen sms code in, druk op bevestigen, hervat daarna de automatische test
        * Gebruiker "sandraTD" start het behandeltraject bij Digidok
        * Als de vraag "Gaat het om dagzorg of anw?" niet zichtbaar is, navigeer via de knop "Terug"

    Scenario: Temp
        * Gebruiker controleert de "Gaat het om dagzorg of anw?" vraag titel
        * Gebruiker kiest de "Dagzorg" antwoorden bij de "Gaat het om dagzorg of anw?" vraag
        * Gebruiker klikt op de Volgende knop bij de "Gaat het om dagzorg of anw?" vraag
        * Gebruiker kiest de "Huidklachten" antwoorden bij de "Waarmee kunnen we je helpen?" vraag