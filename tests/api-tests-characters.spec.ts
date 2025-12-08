import { test, expect } from "@playwright/test";
import { Character } from "../playwright/types/character";

test.describe(() => {
    test.use({
        baseURL: 'https://swapi.tech/api/',
        extraHTTPHeaders: {
            'Accept': 'application/json'
        },
    });

    test('Validate details of character Han Solo', async ({ request }) => {
        const response = await request.get(`people`, {
            params: {
                'name': 'Han Solo'
            }
        });
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        const character = body.result[0].properties as Character;

        expect(character.name).toBe("Han Solo");
        expect(character.gender).toBe("male");
        expect(character.birth_year).toBe("29BBY");
        expect(character.eye_color).toBe("brown");
        expect(character.skin_color).toBe("fair");
    });

    test('Validate partial matching results for people', async ({ request }) => {
        const response = await request.get(`people`, {
            params: {
                'name': 'Ha'
            }
        });
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        const firstCharacter = body.result[0].properties as Character;
        const secondCharacter = body.result[1].properties as Character;

        expect(firstCharacter.name).toBe("Han Solo");
        expect(firstCharacter.gender).toBe("male");
        expect(firstCharacter.birth_year).toBe("29BBY");
        expect(firstCharacter.eye_color).toBe("brown");
        expect(firstCharacter.skin_color).toBe("fair");
        expect(secondCharacter.name).toBe("Shaak Ti");
        expect(secondCharacter.gender).toBe("female");
        expect(secondCharacter.birth_year).toBe("unknown");
        expect(secondCharacter.eye_color).toBe("black");
        expect(secondCharacter.skin_color).toBe("red, blue, white");
    });

    test('Validate possibility of searching for characters with numeric values', async ({ request }) => {
        const response = await request.get(`people`, {
            params: {
                'name': '1'
            }
        });
        expect(response.ok()).toBeTruthy();

        const body = await response.json();
        const character = body.result[0].properties as Character;

        expect(character.name).toBe("R4-P17");
        expect(character.gender).toBe("female");
        expect(character.birth_year).toBe("unknown");
        expect(character.eye_color).toBe("red, blue");
        expect(character.skin_color).toBe("silver, red");
    });

    test('Returns 400 Bad Request when searching with invalid input', async ({ request }) => {
        const response = await request.get(`people`, {
            params: {
                'name': '*Ha'
            }
        });
        expect(response.status()).toBe(400);
    });

})