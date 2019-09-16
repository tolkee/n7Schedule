import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Navbar from './Navbar';

const Layout = (props) => (
  <div>
    <Helmet title="foo bar" defer={false}>
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
    <Navbar week={props.week} />
    <div style={{ marginTop: '75px' }}>{props.children}</div>
  </div>
);

export default Layout;
