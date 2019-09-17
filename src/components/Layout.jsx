import React, { useState } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import axios from 'axios';
import Navbar from './Navbar';
import Image from './Image';

const FabButton = styled.div.attrs(() => ({
  className: 'material-icons',
}))`
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 500;
  color: #121212;
  margin-bottom: 20px;
  margin-right: 10px;
  background-color: orange;
  border-radius: 50px;
  padding: 15px;
  width: 36px;
  transition: transform 2s ease, background-color .8s ease;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 10px;
  transform: ${(p) => (p.updating ? 'rotate(720deg)' : 'none')};

  &:active {
    background-color: white;
  }
`;

const Footer = styled.footer`
  background-color: #0c0c0c;
  height: 100px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterLink = styled.a`
  text-decoration: none;
  margin-left: 5px;
  font-weight: 600;
  color: ${(p) => p.color};
  font-size: ${(p) => p.size}px;
`;

const Line = styled.div`
  height: 1px;
  background-color: lightgrey;
  width: 260px;
  margin: 7px;
`;

const Layout = (props) => {
  const [updating, setUpdating] = useState(false);
  const update = () => {
    setUpdating(!updating);
    axios.post('https://api.netlify.com/build_hooks/5d7fa4bf866ff103634856fb');
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Helmet title="N7Schedule" defer={false}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <style global jsx>
          {`
          body, html {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            background-color: #121212
          }
          .page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          main {
            flex-grow: 1;
          }
        `}
        </style>
      </Helmet>
      <Navbar week={props.week} updated={props.updated} year={props.year} />
      <div style={{ marginTop: '75px', padding: '25px', flexGrow: 1 }}>{props.children}</div>
      <FabButton style={{ fontSize: '36px' }} updating={updating} onClick={() => update()}>updated</FabButton>
      <Footer>
        <div>
          {`© ${props.year}`}
          <FooterLink target="_blank" href="" color="orange" size={19}>Guillaume Lacoste</FooterLink>
        </div>
        <Line />
        <div style={{
          color: 'lightgrey', textAlign: 'center', fontSize: '15px', display: 'flex', alignItems: 'center',
        }}
        >
          <Image size={20} />
          <span style={{ marginLeft: '5px' }}>icon made by</span>
          <FooterLink target="_blank" href="https://www.iconfinder.com/lukaszadam" size={16} color="white">Lukasz Adam</FooterLink>
        </div>
      </Footer>
    </div>
  );
};

export default Layout;
