import { combineReducers, createStore } from 'redux';
import pokemons from './pokemonReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({ pokemons });
const store = createStore(rootReducer, composeWithDevTools());

export default store