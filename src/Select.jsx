import React, { Component } from "react";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      canRender: false,
      onChangeCallBack: this.props.onChangeCallBack || (() => {}),
      onMountCallBack: this.props.onMountCallBack || (() => {}),
      displayName: this.props.displayName || "nombre"
    };
  }

  componentDidMount() {
    this.onLoad();
    this.state.onMountCallBack();
  }

  onLoad() {
    if (this.props.data && this.props.data.length > 0) {
      this.setState({
        selectedItem: this.props.data[0],
        canRender: true
      });
    } else {
      this.setState({
        noDataLoadedError: true,
        error: true
      });
    }
  }

  renderOptions() {
    return (
      this.props.data &&
      this.props.data.map((element, key) => {
        return (
          <option key={"element-" + key}>
            {element[this.state.displayName]}
          </option>
        );
      })
    );
  }

  renderError(renderGenericErrorOnly = true) {
    const possibleErrors = [
      {
        error: "noDataLoadedError",
        value: "ERROR: No se han cargado datos al componente..."
      },
      {
        error: "eresTontoException",
        value: "ERROR: Se ha detectado que eres gilipollas!"
      }
    ];
    const genericError = {
      error: "genericError",
      value: "Oops. Algo ha ido mal..."
    };

    return renderGenericErrorOnly ? (
      <p key={genericError.error + "-select"}>{genericError.value}</p>
    ) : (
      possibleErrors.map(error => {
        return <div key={error.error + "-select"}>{error.value}</div>;
      })
    );
  }

  renderSelect() {
    return <select>{this.renderOptions()}</select>;
  }

  render() {
    return (
      <div>{this.state.error ? this.renderError() : this.renderSelect()}</div>
    );
  }
}
