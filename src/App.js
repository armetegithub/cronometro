import React, { Component } from "react";
import Cronometro from "./components/cronometro";
import { createGlobalStyle } from "styled-components";
import Cronometrohooks from "./components/cronometrohooks";

const GlobalStyle = createGlobalStyle`
body{
  background-color:#222;
  color: #387EF5;
  text-align:center

}
`;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />

        <h1>Cronómetro</h1>

        <Cronometrohooks />
      </>
    );
  }
}

export default App;
