import { produce } from 'immer';
import types from './types';
const INITIAL_STATE = { type: "all", name: "", list: [], beforeList: [], filtersNumber: 0 }
const pokemons = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.ADD_INIT_POKEMONS:
            return produce(state, draftState => {
                draftState.beforeList.push(action.pokemons);
                draftState.list = draftState.beforeList;
            })
        case types.ADD_ACTIVE:
            return produce(state, draftState => {
                const index = draftState.list.findIndex(pokemon => pokemon.id === action.id);
                if (draftState.list[index].class === "active") {
                    draftState.list[index].class = ""
                } else {
                    draftState.list[index].class = "active";
                }
            })
        case types.FILTER_BY_TYPE:
            return produce(state, draftState => {

                draftState.list = draftState.beforeList;
                if (action.filterType === "all") {
                    draftState.list = draftState.beforeList;
                    draftState.type = action.filterType;
                    return draftState;
                } else {
                    let arrayFilterTypes = action.filterType.split(' ');
                    let newPokemonsArr = draftState.list.filter(pokemon => pokemon.types[0].type.name === arrayFilterTypes[0]);
                    if (newPokemonsArr.length === 0) {
                        newPokemonsArr = draftState.list.filter(pokemon => {
                            if (pokemon.types.length > 1) {
                                return pokemon.types[1].type.name === arrayFilterTypes[0]
                            } else {
                                return null
                            }
                        })
                    }
                    draftState.type = action.filterType;
                    draftState.list = newPokemonsArr;
                    return draftState
                }
            })
        case types.FILTER_BY_NAME:
            return produce(state, draftState => {
                draftState.list = draftState.beforeList;
                draftState.name = action.name;
                draftState.list = draftState.list.filter(pokemon => pokemon.name.includes(action.name))
                return draftState
            })
        default:
            return state
    }
}

export default pokemons;