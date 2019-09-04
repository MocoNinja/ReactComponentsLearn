import React, { Component } from "react";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      items: [],
      canRender: false,
      displayNameField: this.props.displayNameField || "value",
      onLoadDataCallback:
        this.props.onLoadDataCallback ||
        (() => {
          return null;
        }),
      onChangeCallback:
        this.props.onChangeCallback ||
        (() => {
          return null;
        })
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    if (this.props.items === undefined || this.props.items.length <= 0) {
      console.error(`The select cannot load items...`);
      this.setState({
        canRender: false
      });
    } else {
      this.setState(
        {
          selectedItem: JSON.stringify(this.props.items[0]),
          items: this.props.items,
          canRender: true
        },
        this.state.onLoadDataCallback
      );
    }
  }

  handleChange(event) {
    this.setState(
      {
        selectedItem: event.target.value
      },
      this.state.onChangeCallback
    );
  }

  renderOptions = () => {
    return this.state.items.map((element, key) => {
      const propertyNameRender = element[this.state.displayNameField];
      const renderElement =
        propertyNameRender === undefined
          ? JSON.stringify(element)
          : propertyNameRender;
      return (
        <option key={key} value={JSON.stringify(element)}>
          {renderElement}
        </option>
      );
    });
  };

  renderSelect = () => {
    return (
      <select className="select" onChange={this.handleChange}>
        {this.renderOptions()}
      </select>
    );
  };

  renderNoItemsError = () => {
    return (
      <div>
        <p>{"Woah! There seems to be no data to render :("}</p>
      </div>
    );
  };

  render() {
    return this.state.canRender
      ? this.renderSelect()
      : this.renderNoItemsError();
  }
}
