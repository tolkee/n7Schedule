import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 90px;
  padding: 20px;
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
  transition: color 0.5s ease;
  &:active {
    color: orange
  }
  &:hover {
    color: orange
  }
`;

const Navbar = (props) => {
  const { year, week, updated } = props;
  return (

    <Wrapper>
      <Overlay />
      <IconNavigation to={`/${week === 1 ? year - 1 : year}/${week === 1 ? 53 : week - 1}`}>
        chevron_left
      </IconNavigation>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column',
      }}
      >
        <div style={{ fontWeight: '800', color: 'white', fontSize: '30px' }}>
          Week
          {' '}
          <span style={{
            marginLeft: '5px', color: 'orange',
          }}
          >
            {week}
          </span>
        </div>
        <div style={{
          color: '#BADFBD', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '15px',
        }}
        >
          <i className="material-icons">
            update
          </i>
          {updated}
        </div>
      </div>
      <IconNavigation to={`/${week === 53 ? year + 1 : year}/${week === 53 ? 1 : week + 1}`}>
        chevron_right
      </IconNavigation>
    </Wrapper>
  );
};

export default Navbar;
