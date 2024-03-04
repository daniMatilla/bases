import { AxiosError } from 'axios';
import { getPokemonById } from '../../src/js-foundation/06-promises';

describe('06-promises', () => {
    test('getPockemonById should return a pokemon', async () => {
        const pokemonId = 1;
        const pokemonName = await getPokemonById(pokemonId);
        expect(pokemonName).toBe('bulbasaur');
    });

    test('getPockemonById should return an error if the pokemon does not exists', async () => {
        const pokemonId = 0;

        expect.assertions(1);

        await getPokemonById(pokemonId).catch((error: AxiosError) => expect(error.response?.status).toBe(404));
    });
});
