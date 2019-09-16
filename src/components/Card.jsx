/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.nav`
  position: relative;
  z-index: 70;
  user-select: none;
  padding: 15px;
  box-sizing: border-box;
  background-color: #121212;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

const Overlay = styled.nav`
  position: absolute;
  z-index: 80;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  user-select: none;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  opacity: .04;
  border-radius: 5px;
`;

const Card = (props) => (
  <Wrapper>
    <Overlay />
    {props.children}
  </Wrapper>
);

export default Card;
