export const searchPokemon = async (Pokemon) =>{
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/${Pokemon}`
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}

export const getPokemons = async (limit = 8, offset = 0) =>{
    try {
        let url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}"`
        const response = await fetch(url);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('No se encontró pokemones')
    }
}   

export const getPokemonData = async (pokeUrl) =>{
    try {
        const response = await fetch(pokeUrl);
        const data = await response.json();
        return data;

    } catch (error) {
        console.log('No se encontró pokemones')
    }
}   