import React, { Component } from "react";
import Select from "./Select";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFruit: null
    };

    this.selectItemRef = React.createRef();
    this.renderSelectedFruit = this.renderSelectedFruit.bind(this);
  }

  generateMockUpData() {
    return [
      { name: "Manzana" },
      { name: "Naranaja" },
      { name: "Melón" },
      { name: "Sandía" },
      { name: "Melocotón" },
      { name: "Plátano" }
    ];
  }

  setSelectedFruit() {
    const selectValue = this.selectItemRef.current.state.selectedItem;
    if (selectValue === null) {
      console.error(`The select doesn't hava a selected value!`);
      return null;
    }
    this.setState({
      selectedFruit: JSON.parse(selectValue).name
    });
  }
  onSelectItemChange = () => {
    this.setSelectedFruit();
  };

  onSelectDataLoad = () => {
    this.setSelectedFruit();
  };

  renderSelectedFruit = () => {
    return this.state.selectedFruit === null ? (
      <p>No fruit selected!</p>
    ) : (
      this.state.selectedFruit
    );
  };

  render() {
    return (
      <div className="App">
        <header>
          <h2>Hello, world!</h2>
        </header>
        <section id="staticSelect-1">
          <header>
            <h3>Static Select 1: Fruits</h3>
          </header>
          <div id="headerDiv">
            <Select
              ref={this.selectItemRef}
              items={this.generateMockUpData()} // Comment at will!
              displayNameField={"name"}
              onChangeCallback={this.onSelectItemChange}
              onLoadDataCallback={this.onSelectDataLoad}
            />
          </div>
          <br />
          <div id="destination">
            Selected fruit is:{" "}
            <span className="hightlight">{this.renderSelectedFruit()}</span>
          </div>
        </section>
      </div>
    );
  }
}
