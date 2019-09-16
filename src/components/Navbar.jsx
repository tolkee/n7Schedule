import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.nav`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding: 25px;
  box-sizing: border-box;
  background-color: #121212;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px;
`;

const Overlay = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  opacity: .08;
`;

const IconNavigation = styled(Link).attrs(() => ({
  className: 'material-icons',
}))`
  z-index: 100;
  color: white;
  text-decoration: none;
  border-bottom: 2px solid orange;
  &:active {
    color: orange
  }
`;

const Navbar = (props) => (
  <Wrapper>
    <Overlay />
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <IconNavigation to={`/${2019}/${props.week - 1}`}>
chevron_left
      </IconNavigation>
      <div>
        <span style={{ fontWeight: '800', color: 'white', fontSize: '30px' }}>Week</span>
        <span style={{
          marginLeft: '10px', fontWeight: '800', color: 'orange', fontSize: '30px',
        }}
        >
          {props.week}
        </span>
      </div>
      <IconNavigation to={`/${2019}/${props.week + 1}`}>
chevron_right
      </IconNavigation>
    </div>
  </Wrapper>
);

export default Navbar;
