import React, { Component } from "react";
import Select from "../Select";

export default class StarWarsApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null
    };

    this.selectdDidLoad = this.selectdDidLoad.bind(this);
    this.selectDidChange = this.selectDidChange.bind(this);
  }

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

  selectDidChange(element) {
    console.log(
      `Soy el padre y he notado que mi elemento hijo ha cambiado :(\nAhora dice que es: ${JSON.stringify(
        element
      )}`
    );
    this.setState({
      selectedItem: element
    });
  }

  selectdDidLoad(element) {
    console.log(
      `He detectado que el select se ha cargado, con un objeto cuya representación es: ${JSON.stringify(
        element
      )}`
    );

    this.setState({
      selectedItem: element
    });
  }

  renderSelectedElementIfItExists() {
    return this.state.selectedItem ? (
      <div>{`Hola, soy ${this.state.selectedItem.nombre} y mi grado de molonidad es ${this.state.selectedItem.mola}`}</div>
    ) : (
      <p>No hay ningún elemento seleccionado...</p>
    );
  }

  render() {
    return (
      <section name="star-wars-app">
        <header>Star Wars Api Example</header>
        <Select
          data={this.generateMockUpData()}
          onChangeCallback={this.selectDidChange}
          onLoadCallback={this.selectdDidLoad}
        />
        {this.renderSelectedElementIfItExists()}
      </section>
    );
  }
}
