import React from 'react';
import logo from '../img/pokemon--eps--vector-logo.png';
import styled from 'styled-components';
const Header = () => {
    return (
        <LogoContainer>
            <img src={logo} alt="logo" />
        </LogoContainer>
    );
}

export default Header;

const LogoContainer = styled.div`
position:relative;
width:100%;
height:30vh;

img{
    position:absolute;
    z-index:-1;
    top:50%;
    left:50%;
    height:180%;
    transform:translate(-50%,-50%);
}
`