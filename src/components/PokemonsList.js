import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import actions from '../redux/actions';
const PokemonsList = ({ list, addActive, addPokemons, loadedPokemons }) => {

    const showAdditionalInfo = (id) => {
        addActive(id);
    }
    const fetchMorePokemons = () => {
        const pokemonsNumber = loadedPokemons.length;
        const fetchPokemon = (id) => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                .then(res => res.json())
                .then(data => {
                    addPokemons(data);
                })
        }
        for (let i = pokemonsNumber + 1; i <= pokemonsNumber + 20; i++) {
            fetchPokemon(i);
        }
    }
    const pokemons = list.map(pokemon => {
        return (
            <PokemonContainer key={pokemon.id} className={pokemon.class ? "active" : null} onClick={() => showAdditionalInfo(pokemon.id)}>
                <div className="imgWrap">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                </div>
                <h2>{pokemon.name}</h2>
                <p>type: {pokemon.types.length < 2 ? pokemon.types[0].type.name : `${pokemon.types[0].type.name} ${pokemon.types[1].type.name}`}</p>
                <div className="additionalInfo">
                    <p>weight: {pokemon.weight}</p>
                    <p>height: {pokemon.height}</p>
                </div>
            </PokemonContainer>
        )
    })
    const totalPokemonsNumber = 898;
    return (
        <Wrapper>
            {pokemons}
            <FetchMorePokemonsBtn style={list.length >= totalPokemonsNumber ? { display: "none" } : { display: "block" }} onClick={fetchMorePokemons}>Load More !</FetchMorePokemonsBtn>
        </Wrapper>
    );
}
const mapDispatchToProps = (dispatch) => ({
    addActive: (id) => dispatch(actions.addActive(id)),
    addPokemons: (pokemon) => dispatch(actions.addInitPokemons(pokemon))
})
const mapStateToProps = (state) => ({
    list: state.pokemons.list,
    loadedPokemons: state.pokemons.beforeList
})
export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);

const Wrapper = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:flex-start;
margin: 2% 10% 10% 10%;
background:#12344f;
min-height:50vh;
border-radius:14px;
padding:10px 0;
`

const PokemonContainer = styled.div`
position:relative;
flex-basis:21%;
height:29vh;
background:#dbbc14;
margin:20px 2%;
padding:10px 2px 20px 2px;
border-radius:5px;
border:2px solid grey;
transition:.25s;
cursor:pointer;
overflow:hidden;
div.imgWrap{
    position:relative;
    width:100%;
    height:15vh;
img{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        width:110%;
        height:110%;
        object-fit:contain;
    }
}
h2{
    font-size:22px;
    text-align:center;
}
p{
    margin:5px 0;
    color:#222;
    text-align:center;
    font-size:14px;
}
div.additionalInfo{
    transform:scale(0);
    transition:.25s;
}
&.active{
    margin:0 2%;
    height:35vh;
    background:orangered;
    div.additionalInfo{
    transform:scale(1);
}
}
@media(max-width:732px){
    &{
        height:35vh;
    }
    h2{
        font-size:18px;
    }
    p{
        font-size:12px;
    }

    &.active{
        height:44vh;
    }
}
@media(max-width:1024px) and (orientation:portrait){
    &{
        flex-basis:46%;
        height:25vh;
    }
    &.active{
        height:28vh;
    }
    h2{
        font-size:34px;
    }
    p{
        font-size:24px;
    }
}
@media(max-width:600px) and (orientation:portrait){
    &{
        height:30vh;
    }
    h2{
        font-size:32px;
    }
    p{
        font-size:20px;
    }
    &.active{
        height:34vh;
    }
}
@media(max-width:412px) and (orientation:portrait){
    &{
        height:28vh;
    }
    h2{
        font-size:24px;
    }
    p{
        font-size:14px;
    }
    &.active{
        height:32vh;
    }
}
@media(max-width:360px) and (orientation:portrait){
    &{
        height:30vh;
    }
    h2{
        font-size:20px;
    }
    p{
        font-size:13px;
    }
    &.active{
        height:34vh;
    }
}
`

const FetchMorePokemonsBtn = styled.button`
flex-basis:20%;
height:8vh;
line-height:8vh;
margin:5vh 40%;
border:2px solid lightgrey;
border-radius:10px;
background: #f92f47;
color:white;
font-size:16px;
text-align:center;
font-weight:bold;
letter-spacing:1px;
text-transform:uppercase;
cursor:pointer ;
@media(max-width:732px){
    &{
        flex-basis:30%;
        margin:5vh 35%;
        height:12vh;
        line-height:12vh;
    }
}
@media(max-width:1024px) and (orientation:portrait){
    &{
        flex-basis:40%;
        margin:5vh 30%;
        font-size:24px;
    }
}
@media(max-width:600px) and (orientation:portrait){
    &{
        flex-basis:50%;
        margin:5vh 25%;
        font-size:20px;
        height:8vh;
        line-height:8vh;
    }
}
@media(max-width:412px) and (orientation:portrait){
    &{
        font-size:16px;
        flex-basis:60%;
        margin:5vh 20%;
    }
}


`