import { test, expect } from "@playwright/test";
import { Planet } from "../playwright/types/planets";

test.describe(() => {
  test.use({
    baseURL: process.env.API_URL,
    extraHTTPHeaders: {
      Accept: "application/json",
    },
  });

  test("Validate details of planet Yavin IV", async ({ request }) => {
    const response = await request.get(`planets`, {
      params: {
        name: "Yavin IV",
      },
    });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const planet = body.result[0].properties as Planet;

    expect(planet.name).toBe("Yavin IV");
    expect(planet.population).toBe("1000");
    expect(planet.climate).toBe("temperate, tropical");
    expect(planet.gravity).toBe("1 standard");
  });

  test("Validate partial matching results for planets", async ({ request }) => {
    const response = await request.get(`planets`, {
      params: {
        name: "IV",
      },
    });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const firstPlanet = body.result[0].properties as Planet;
    const secondPlanet = body.result[1].properties as Planet;

    expect(firstPlanet.name).toBe("Yavin IV");
    expect(firstPlanet.population).toBe("1000");
    expect(firstPlanet.climate).toBe("temperate, tropical");
    expect(firstPlanet.gravity).toBe("1 standard");
    expect(secondPlanet.name).toBe("Bestine IV");
    expect(secondPlanet.population).toBe("62000000");
    expect(secondPlanet.climate).toBe("temperate");
    expect(secondPlanet.gravity).toBe("unknown");
  });

  test("Validate possibility of searching for planets with numeric values", async ({
    request,
  }) => {
    const response = await request.get(`planets`, {
      params: {
        name: "2",
      },
    });
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    const planet = body.result[0].properties as Planet;

    expect(planet.name).toBe("Alderaan");
    expect(planet.population).toBe("2000000000");
    expect(planet.climate).toBe("temperate");
    expect(planet.gravity).toBe("1 standard");
  });

  test("Returns 400 Bad Request when searching with invalid input", async ({
    request,
  }) => {
    const response = await request.get(`planets`, {
      params: {
        name: "*Tatooine",
      },
    });
    expect(response.status()).toBe(400);
  });
});