import { test, expect } from "@playwright/test"
import { StarWarsSearch } from "../../playwright/sw-search-page";


test.skip('Generate HAR file for characters', async ({ page }) => {
    const starWarsSearch = new StarWarsSearch(page);
    await starWarsSearch.goto('localhost:4200');
    await page.routeFromHAR('././tests/api-tests/character/har/swapi-people.har', {
        url: '**/api/people/*',
        update: true
    });
    await starWarsSearch.findCharacter('Han Solo');
    await starWarsSearch.findCharacter('Bart Simpson');
    await starWarsSearch.findCharacter('Ha');
    await expect(starWarsSearch.characters.nth(0)).toHaveText('Han Solo');
});


test.skip('Generate HAR file for finding a planet', async ({ page }) => {
    const starWarsSearch = new StarWarsSearch(page);
    await starWarsSearch.goto('localhost:4200');
    await page.routeFromHAR('././tests/api-tests/planet/har/swapi-planets.har', {
        url: '**/api/planets/*',
        update: true
    });
    await starWarsSearch.findPlanet('Tatooine');
    await starWarsSearch.findPlanet('Argus')
    await starWarsSearch.findPlanet('Ta');
    await expect(starWarsSearch.planets.nth(0)).toHaveText('Tatooine');
});
