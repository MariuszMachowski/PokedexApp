import types from "./types";

const addInitPokemons = (pokemons) => ({
    type: types.ADD_INIT_POKEMONS,
    pokemons
})

const addActive = (id) => ({
    type: types.ADD_ACTIVE,
    id
})

const filterByType = (filterType) => ({
    type: types.FILTER_BY_TYPE,
    filterType
})

const filterByName = (name) => ({
    type: types.FILTER_BY_NAME,
    name
})

export default { addInitPokemons, addActive, filterByType, filterByName }