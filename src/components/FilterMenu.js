import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import sun from '../img/sun-solid.svg';
import moon from '../img/moon-solid.svg';
const FilterMenu = ({ type, changeType, list, name, changeName }) => {

    const [uniqueTypes, setUniqueTypes] = useState([]);
    const [hide, setHide] = useState(true);
    useEffect(() => {
        let data = list.map(obj => obj.types[0].type.name)
        const unique = [];
        data.forEach((type) => {
            if (!unique.includes(type)) {
                unique.push(type)
            }
        })
        setUniqueTypes(unique);
    }, [list])

    const handleChangeType = (e) => {
        changeType(e.target.value);
    }
    const handleChangeName = (e) => {
        changeName(e.target.value.toLowerCase())
    }
    const handleToggleTheme = () => {
        setHide(!hide)
    }

    document.body.style.backgroundColor = hide ? "#202146" : "#eee";

    return (
        <FilterContainer>
            <label>Filter by type:
                <select value={type} onChange={handleChangeType}>
                    <option value="all">all</option>
                    {uniqueTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </label>
            <label>Filter by name:
                <input type="text" value={name} onChange={handleChangeName} placeholder="enter the name..." />
            </label>
            <ThemeContainer>
                <div onClick={handleToggleTheme}>
                    <img src={moon} alt="moon" className={`moon ${hide ? 'hide' : null}`} />
                    <img src={sun} alt="sun" className={`sun ${hide ? null : 'hide'}`} />
                </div>
            </ThemeContainer>
        </FilterContainer>
    );
}
const mapStateToProps = (state) => ({
    type: state.pokemons.type,
    list: state.pokemons.beforeList,
    name: state.pokemons.name
})
const mapDispatchToProps = (dispatch) => ({
    changeType: (type) => dispatch(actions.filterByType(type)),
    addPokemons: (pokemon) => dispatch(actions.addInitPokemons(pokemon)),
    changeName: (name) => dispatch(actions.filterByName(name))
})
export default connect(mapStateToProps, mapDispatchToProps)(FilterMenu);

const FilterContainer = styled.div`
position:relative;
display:flex;
align-items:center;
height:10vh;
margin:5vh 10%;
border-radius:14px;
background:#f92f47;
color:white;

label{
    display:flex;
    justify-content:center;
    align-items:center;
   flex-basis:34%;
   margin-left:1%;
   input,select{
    margin-left:2%;
    height:4vh;
    outline:none;
    border:2px solid #202146;
    border-radius:5px;
    cursor:pointer ;
   }
   input{
    cursor:text ;
    padding-left:5px;
   }
}
@media(min-width:1920px){
    label{
        font-size:28px;
        input,select{
        margin-left:3%;
        margin-right:1%;
        height:6vh;
        font-size:26px;
        }
        input{
            padding-left:15px;
        }
    }
}
@media(max-width:732px){
    &{
        height:19vh;
    }
    label{
        flex-basis:45%;
        input,select{
        margin-left:2%;
        margin-right:1%;
        height:7vh;
        }
    }
}
@media(max-width:640px){
label{
    font-size:13px;
    flex-basis:43%;
}
}
@media(max-width:1024px) and (orientation:portrait){
&{
    flex-wrap:wrap;
    height:15vh;
}
label{
    flex-basis:100%;
    font-size:25px;
    height:7vh;
    input,select{
        margin-left:2%;
        margin-right:1%;
        font-size:22px;
        height:4.5vh;
        }
}
}
@media(max-width:600px) and (orientation:portrait){
    label{
    font-size:20px;
    input,select{
        font-size:18px;
        }
}
}
@media(max-width:412px) and (orientation:portrait){
    &{
    height:16vh;
}
    label{
    font-size:16px;
    height:7.5vh;
    input,select{
        font-size:14px;
        height:4vh;
        }
}
}
@media(max-width:360px) and (orientation:portrait){
    label{
    font-size:14px;
    input,select{
        font-size:12px;
        }
}
}
`
const ThemeContainer = styled.div`
display:flex;
justify-content:flex-end;
flex-grow:1;
height:5vh;
margin-right:3%;
div{
    position:relative;
    height:5vh;
    width:5vh;
    img{
        position:absolute;
        top:50%;
        left:50%;
        width:100%;
        height:100%;
        transform:translate(-50%,-50%) scale(1);
        cursor:pointer;
        transition:.25s;
    }
    img.sun{
        filter: invert(1);
    }
    .hide{
        transform:translate(-50%,-50%) scale(0) rotate(90deg);
    }
}
@media(max-width:1024px) and (orientation:portrait){
div{
    position:absolute;
    right:2.5%;
    top:10%;
    width:4vh;
    height:4vh;
}
}
`
