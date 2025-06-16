import { fetchPokeData } from './fetchAPI';

const CACHE_KEY = 'pokemon_cache_data';

export const fetchArrayPokeData = async () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
        console.log('캐시에서 데이터 불러오기');
        return JSON.parse(cached);
    }

    const ids = Array.from({length: 151}, (_, i) => i+1);
    const promises = ids.map(id => fetchPokeData(id));
    const pokeArray = await Promise.all(promises);

    localStorage.setItem(CACHE_KEY, JSON.stringify(pokeArray));

    return pokeArray;
}