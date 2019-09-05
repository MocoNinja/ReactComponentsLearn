import React, { Component } from "react";
import Select from "../Select";

export default class StarWarsApp extends Component {
  generateMockUpData() {
    return [
      {
        nombre: "Javier",
        mola: "Poco"
      },
      {
        nombre: "Maritza",
        mola: "Bastante"
      },
      {
        nombre: "Ariel",
        mola: "Infinito"
      }
    ];
  }

  render() {
    return (
      <section name="star-wars-app">
        <header>Star Wars Api Example</header>
        <Select />
      </section>
    );
  }
}
