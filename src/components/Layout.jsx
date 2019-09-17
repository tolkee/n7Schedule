import React, { useState } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import axios from 'axios';
import Navbar from './Navbar';

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

const Layout = (props) => {
  const [updating, setUpdating] = useState(false);
  const update = () => {
    setUpdating(!updating);
    axios.post('https://api.netlify.com/build_hooks/5d7fa4bf866ff103634856fb');
  };
  return (
    <div>
      <Helmet title="N7Schedule" defer={false}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <style global jsx>
          {`
          body,
          html {
            font-family: 'Montserrat', sans-serif;
            margin: 0;
            padding: 15px;
            background-color: #121212
          }
        `}
        </style>
      </Helmet>
      <Navbar week={props.week} updated={props.updated} year={props.year} />
      <div style={{ marginTop: '75px' }}>{props.children}</div>
      <FabButton style={{ fontSize: '36px' }} updating={updating} onClick={() => update()}>updated</FabButton>
    </div>
  );
};

export default Layout;
