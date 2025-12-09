import { test, expect } from "@playwright/test";
import { StarWarsSearch } from "../playwright/sw-search-page";

test.describe("Functionality tests", () => {
  let starWarsSearch: StarWarsSearch;

  test.beforeEach(async ({ page }) => {
    starWarsSearch = new StarWarsSearch(page);
    await starWarsSearch.goto(process.env.BASE_URL);
  });

  test("Happy path - search for people with single result and validate results", async () => {
    await starWarsSearch.findCharacter("Han Solo");
    await expect(starWarsSearch.characterGender).toBeVisible();
    await expect(starWarsSearch.characterBirthYear).toBeVisible();
    await expect(starWarsSearch.characterEyeColor).toBeVisible();
    await expect(starWarsSearch.characterSkinColor).toBeVisible();
    await expect(starWarsSearch.characterGenderValue).not.toBeEmpty();
    await expect(starWarsSearch.characterBirthYearValue).not.toBeEmpty();
    await expect(starWarsSearch.characterEyeColorValue).not.toBeEmpty();
    await expect(starWarsSearch.characterSkinColorValue).not.toBeEmpty();
  });

  test("Happy path - search for planets with single result and validate results", async () => {
    await starWarsSearch.findPlanet("Tatooine");
    await expect(starWarsSearch.planetPopulation).toBeVisible();
    await expect(starWarsSearch.planetClimate).toBeVisible();
    await expect(starWarsSearch.planetGravity).toBeVisible();
    await expect(starWarsSearch.planetClimateValue).not.toBeEmpty();
    await expect(starWarsSearch.planetGravityValue).not.toBeEmpty();
    await expect(starWarsSearch.planetPopulationValue).not.toBeEmpty();
  });

  test("Unhappy path - people not found", async () => {
    await starWarsSearch.findCharacter("Bart Simpson");
    await expect(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - planet not found", async () => {
    await starWarsSearch.findPlanet("Argus");
    await expect(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - planet as people", async () => {
    await starWarsSearch.findCharacter("Utapau");
    await expect(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - people as planet", async () => {
    await starWarsSearch.findPlanet("Luke Skywalker");
    await expect(starWarsSearch.notFound).toBeVisible();
  });

  test("Clearing results by searching with an empty field for people", async () => {
    await starWarsSearch.findCharacter("Luke Skywalker");
    await expect(starWarsSearch.loading).not.toBeVisible();
    await starWarsSearch.searchBox.clear();
    await starWarsSearch.searchButton.click();
    await expect(starWarsSearch.characters).not.toBeVisible();
    await expect(starWarsSearch.planets).not.toBeVisible();
  });

  test("Clearing results by searching with an empty field for planets", async () => {
    await starWarsSearch.findPlanet("Tatooine");
    await expect(starWarsSearch.loading).not.toBeVisible();
    await starWarsSearch.searchBox.clear();
    await starWarsSearch.searchButton.click();
    await expect(starWarsSearch.characters).not.toBeVisible();
    await expect(starWarsSearch.planets).not.toBeVisible();
  });

  test("Check if searching can be performed by pressing `Enter` button", async ({
    page,
  }) => {
    await starWarsSearch.planetsRadioButton.click();
    await starWarsSearch.fillInTextInSearchbox("Tatooine");
    await page.keyboard.press("Enter");
    await expect(starWarsSearch.planetPopulation).toBeVisible();
  });

  test("Check if partial matching provides user with results for people", async () => {
    await starWarsSearch.findCharacter("Ha");
    await expect(starWarsSearch.characters.nth(0)).toContainText("Han Solo");
    await expect(starWarsSearch.characters.nth(1)).toContainText("Shaak Ti");
  });

  test("Check if partial matching provides user with results for planets ", async () => {
    await starWarsSearch.findPlanet("Ta");
    await expect(starWarsSearch.planets.nth(0)).toContainText("Tatooine");
    await expect(starWarsSearch.planets.nth(1)).toContainText("Utapau");
    await expect(starWarsSearch.planets.nth(2)).toContainText("Mustafar");
    await expect(starWarsSearch.planets.nth(3)).toContainText("Nal Hutta");
  });
});
