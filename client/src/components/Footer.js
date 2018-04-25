import React, { Component } from 'react';
import styled from 'styled-components'

const FooterStyle = styled.div`
height: 100px;
width: 100vw;
display: flex;
border-bottom: 1px solid seashell;
margin-bottom: 0;
background: #e14658;
color: seashell;
`

class Footer extends Component {
    render() {
        return (
            <FooterStyle>
                <h1>hey</h1>
            </FooterStyle>
        );
    }
}

export default Footer;