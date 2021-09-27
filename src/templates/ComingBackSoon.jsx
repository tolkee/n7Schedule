import React from "react";
import { Helmet } from "react-helmet";

const ComingBackSoon = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Helmet title="N7Schedule" defer={false}>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <style global jsx>
          {`
            body,
            html {
              font-family: "Montserrat", sans-serif;
              margin: 0;
              background-color: #121212;
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
      <span style={{ color: "orange", fontWeight: "900", marginRight: "10px" }}>
        Coming back soon...
      </span>
    </div>
  );
};

export default ComingBackSoon;
