import React, { Component } from "react";
import SelectRef from "./SelectRef";
import performRequest from "./ApiZaragoza/apiZaragozaFetch";
import ApiItem from "./ApiZaragoza/ApiItem";

export default class AppSelectRef extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFruit: null,
      dataFromApi: null,
      apiWasFetched: false
    };

    this.selectItemRef = React.createRef();
    this.renderSelectedFruit = this.renderSelectedFruit.bind(this);
    this.fetchDataFromZaragozaApi = this.fetchDataFromZaragozaApi.bind(this);
    this.clearDataFetched = this.clearDataFetched.bind(this);
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
    const value =
      this.selectItemRef.current.state.selectedItem === null
        ? this.selectItemRef.current.state.selectedItem
        : JSON.parse(this.selectItemRef.current.state.selectedItem).name;
    if (value === null) {
      console.error(`The select doesn't hava a selected value!`);
    }
    this.setState({
      selectedFruit: value
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

  async fetchDataFromZaragozaApi() {
    const data = await performRequest();
    if (data) {
      this.setState({
        dataFromApi: data,
        apiWasFetched: true
      });
    }
  }

  clearDataFetched() {
    this.setState({
      dataFromApi: null,
      apiWasFetched: false
    });
  }

  renderApiData = () => {
    return this.state.apiWasFetched ? (
      this.state.dataFromApi.map((element, key) => {
        return (
          <ApiItem title={element.title} horario={element.horario} key={key} />
        );
      })
    ) : (
      <p>Awaiting for API data...</p>
    );
  };

  render() {
    return (
      <div className="App">
        <section id="staticSelect-1">
          <header>
            <h3>Static Select 1: Fruits</h3>
          </header>
          <div id="headerDiv">
            <SelectRef
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
        <section id="zaragozaApi">
          <button onClick={this.fetchDataFromZaragozaApi}>Fetch Data</button>
          <button onClick={this.clearDataFetched}>Clear Data</button>
          {this.renderApiData()}
        </section>
      </div>
    );
  }
}
