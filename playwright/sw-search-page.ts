import { expect, Locator, Page } from "@playwright/test";

export class StarWarsSearch {
  readonly page: Page;
  readonly pageHeading: Locator;
  readonly peopleRadioButton: Locator;
  readonly planetsRadioButton: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly cardTitle: Locator;
  readonly notFound: Locator;
  readonly loading: Locator;
  readonly characters: Locator;
  readonly characterGender: Locator;
  readonly characterBirthYear: Locator;
  readonly characterEyeColor: Locator;
  readonly characterSkinColor: Locator;
  readonly characterGenderValue: Locator;
  readonly characterBirthYearValue: Locator;
  readonly characterSkinColorValue: Locator;
  readonly characterEyeColorValue: Locator;
  readonly planets: Locator;
  readonly planetPopulation: Locator;
  readonly planetClimate: Locator;
  readonly planetGravity: Locator;
  readonly planetPopulationValue: Locator;
  readonly planetClimateValue: Locator;
  readonly planetGravityValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleRadioButton = page.getByRole("radio", { name: "people" });
    this.planetsRadioButton = page.getByRole("radio", { name: "planets" });
    this.searchBox = page.getByRole("searchbox", { name: "Query" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.notFound = page.getByText("Not found.");
    this.loading = page.getByText("Loading...");

    this.characters = page.locator("app-character");
    this.characterGender = this.characters.getByText("Gender");
    this.characterGenderValue = this.characters.locator(".gender");
    this.characterBirthYear = this.characters.getByText("Birth year");
    this.characterBirthYearValue = this.characters.locator(".birthyear");
    this.characterEyeColor = this.characters.getByText("Eye color");
    this.characterEyeColorValue = this.characters.locator(".eyecolor");
    this.characterSkinColor = this.characters.getByText("Skin color");
    this.characterSkinColorValue = this.characters.locator(".skincolor");

    this.planets = page.locator("app-planet");
    this.planetPopulation = this.planets.getByText("Population");
    this.planetPopulationValue = this.planets.locator(".population");
    this.planetClimate = this.planets.getByText("Climate");
    this.planetClimateValue = this.planets.locator(".climate");
    this.planetGravity = this.planets.getByText("Gravity");
    this.planetGravityValue = this.planets.locator(".gravity");
  };

  async goto(url: string) {
    await this.page.goto(url);
    await expect(this.searchBox).toBeVisible();
  };

  async fillInTextInSearchbox(checkText: string) {
    await this.searchBox.click();
    await this.searchBox.fill(checkText);
  };

  async findCharacter(characterName: string) {
    await this.peopleRadioButton.click();
    await this.fillInTextInSearchbox(characterName);
    await this.searchButton.click();
  };

  async findPlanet(planetName: string) {
    await this.planetsRadioButton.click();
    await this.fillInTextInSearchbox(planetName);
    await this.searchButton.click();
  };
};
