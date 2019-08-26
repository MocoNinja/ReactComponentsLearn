import React, { Component } from "react";
import Select from "./Select";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.selectItemRef = React.createRef();
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

  onSelectItemChange = () => {
    console.log(
      `The value of the select item is: ${this.selectItemRef.current.state.selectedItem}`
    );
  };

  onSelectDataLoad = () => {
    console.log(
      `The value of the select item (ON LOAD) is: ${this.selectItemRef.current.state.selectedItem}`
    );
  }

  render() {
    return (
      <div className="App">
        <header>
          <h2>Hello, world!</h2>
        </header>
        <div>
          <Select
            ref={this.selectItemRef}
            items={this.generateMockUpData()}
            displayNameField={"name"}
            onChangeCallback={this.onSelectItemChange}
            onLoadDataCallback={this.onSelectDataLoad}
          />
        </div>
      </div>
    );
  }
}
