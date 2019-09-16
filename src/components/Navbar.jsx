import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  user-select: none;
  padding: 25px;
  box-sizing: border-box;
  background-color: #121212;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 10px;
`;

const Overlay = styled.nav`
  position: absolute;
  z-index: 150;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  user-select: none;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  opacity: .08;
`;


const Navbar = (props) => (
  <Wrapper>
    <Overlay />
    <div style={{ zIndex: 180 }}>
      <span style={{ fontWeight: '800', color: 'white', fontSize: '30px' }}>Week</span>
      <span style={{
        marginLeft: '10px', fontWeight: '800', color: 'orange', fontSize: '30px',
      }}
      >
        {props.week}
      </span>
    </div>
  </Wrapper>
);

export default Navbar;
