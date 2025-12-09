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
    await expect.soft(starWarsSearch.characterGender).toBeVisible();
    await expect.soft(starWarsSearch.characterBirthYear).toBeVisible();
    await expect.soft(starWarsSearch.characterEyeColor).toBeVisible();
    await expect.soft(starWarsSearch.characterSkinColor).toBeVisible();
    await expect.soft(starWarsSearch.characterGenderValue).not.toBeEmpty();
    await expect.soft(starWarsSearch.characterBirthYearValue).not.toBeEmpty();
    await expect.soft(starWarsSearch.characterEyeColorValue).not.toBeEmpty();
    await expect.soft(starWarsSearch.characterSkinColorValue).not.toBeEmpty();
  });

  test("Happy path - search for planets with single result and validate results", async () => {
    await starWarsSearch.findPlanet("Tatooine");
    await expect.soft(starWarsSearch.planetPopulation).toBeVisible();
    await expect.soft(starWarsSearch.planetClimate).toBeVisible();
    await expect.soft(starWarsSearch.planetGravity).toBeVisible();
    await expect.soft(starWarsSearch.planetClimateValue).not.toBeEmpty();
    await expect.soft(starWarsSearch.planetGravityValue).not.toBeEmpty();
    await expect.soft(starWarsSearch.planetPopulationValue).not.toBeEmpty();
  });

  test("Unhappy path - people not found", async () => {
    await starWarsSearch.findCharacter("Bart Simpson");
    await expect.soft(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - planet not found", async () => {
    await starWarsSearch.findPlanet("Argus");
    await expect.soft(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - planet as people", async () => {
    await starWarsSearch.findCharacter("Utapau");
    await expect.soft(starWarsSearch.notFound).toBeVisible();
  });

  test("Unhappy path - people as planet", async () => {
    await starWarsSearch.findPlanet("Luke Skywalker");
    await expect.soft(starWarsSearch.notFound).toBeVisible();
  });

  test("Clearing results by searching with an empty field for people", async () => {
    await starWarsSearch.findCharacter("Luke Skywalker");
    await expect(starWarsSearch.loading).not.toBeVisible();
    await starWarsSearch.searchBox.clear();
    await starWarsSearch.searchButton.click();
    await expect.soft(starWarsSearch.characters).not.toBeVisible();
    await expect.soft(starWarsSearch.planets).not.toBeVisible();
  });

  test("Clearing results by searching with an empty field for planets", async () => {
    await starWarsSearch.findPlanet("Tatooine");
    await expect(starWarsSearch.loading).not.toBeVisible();
    await starWarsSearch.searchBox.clear();
    await starWarsSearch.searchButton.click();
    await expect.soft(starWarsSearch.characters).not.toBeVisible();
    await expect.soft(starWarsSearch.planets).not.toBeVisible();
  });

  test("Check if searching can be performed by pressing `Enter` button", async ({
    page,
  }) => {
    await starWarsSearch.planetsRadioButton.click();
    await starWarsSearch.fillInTextInSearchbox("Tatooine");
    await page.keyboard.press("Enter");
    await expect.soft(starWarsSearch.planetPopulation).toBeVisible();
  });

  test("Check if partial matching provides user with results for people", async () => {
    await starWarsSearch.findCharacter("Ha");
    await expect.soft(starWarsSearch.characters.nth(0)).toContainText("Han Solo");
    await expect.soft(starWarsSearch.characters.nth(1)).toContainText("Shaak Ti");
  });

  test("Check if partial matching provides user with results for planets ", async () => {
    await starWarsSearch.findPlanet("Ta");
    await expect.soft(starWarsSearch.planets.nth(0)).toContainText("Tatooine");
    await expect.soft(starWarsSearch.planets.nth(1)).toContainText("Utapau");
    await expect.soft(starWarsSearch.planets.nth(2)).toContainText("Mustafar");
    await expect.soft(starWarsSearch.planets.nth(3)).toContainText("Nal Hutta");
  });
});
