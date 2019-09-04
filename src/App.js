import React, { Component } from "react";
import AppSelectRef from "./AppSelectRef";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsToRender: [],
      renderAppSelectRef: false
    };
    this.handleComponentCheckboxToggle = this.handleComponentCheckboxToggle.bind(
      this
    );
  }

  componentDidMount() {
    const components = ["AppSelectRef"];
    this.setState({
      componentsToRender: components
    });
  }

  handleComponentCheckboxToggle(event) {
    const [name, value] = [event.target.value, event.target.checked];
    console.log(`Se ha pulsado el checbox ${name} y vale: ${value}`);
    const nameState = "render" + name;
    this.setState({
      [nameState]: value
    });
  }

  renderComponentsSelector() {
    return this.state.componentsToRender.map((component, index) => {
      return (
        <div key={"input-group-select-" + index}>
          <label htmlFor={component}>{component}</label>
          <input
            type="checkbox"
            name={component}
            value={component}
            onChange={this.handleComponentCheckboxToggle}
          />
        </div>
      );
    });
  }

  renderComponents() {
    return [
      this.state.renderAppSelectRef ? <AppSelectRef key="adadhalk" /> : <></>,
    ].map((element, index) => {
      return <div key={index}>{element}</div>;
    });
  }

  render() {
    return (
      <div className="App">
        <section name="main">
          <header>
            <h2>Hello, world!</h2>
          </header>
          <div name="selector">{this.renderComponentsSelector()}</div>
        </section>
        <section name="components">{this.renderComponents()}</section>
      </div>
    );
  }
}
