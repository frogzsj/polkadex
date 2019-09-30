import queryString from 'querystring';
import padStart from 'lodash/padStart';
import { get } from './index';

const POKE_API_URL = 'https://pokeapi.co/api/v2';
const POKE_PICS_URL = id => `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padStart(id, 3, '0')}.png`;

export const getPokemon = async id => {
  try {
    const response = await get(`${POKE_API_URL}/pokemon/${id}`);
    if (response.ok) {
      const result = await response.json();
      return {
        ...result,
        pic_url: POKE_PICS_URL(id),
      };
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getPokemons = async (offset = 0) => {
  const params = {
    offset,
    limit: 50,
  };
  try {
    const response = await get(`${POKE_API_URL}/pokemon?${queryString.stringify(params)}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
};
