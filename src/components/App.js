import React, { useEffect } from 'react';
import PokemonsList from './PokemonsList';
import Header from './Header';
import FilterMenu from './FilterMenu';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import '../App.css';

const App = ({ add }) => {
  const pokemonsNumber = 20;
  useEffect(() => {
    const fetchPokemon = (id) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(res => res.json())
        .then(data => {
          add(data)
        })
    }
    const fetchPokemons = () => {
      for (let i = 1; i <= pokemonsNumber; i++) {
        fetchPokemon(i)
      }
    }
    fetchPokemons();
  }, [])
  return (
    <>
      <Header />
      <FilterMenu />
      <PokemonsList />
    </>
  );
}
const mapDispatchToProps = (dispatch) => ({
  add: (pokemon) => dispatch(actions.addInitPokemons(pokemon))
})
export default connect(null, mapDispatchToProps)(App);