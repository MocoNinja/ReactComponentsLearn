import React, { Component } from "react";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      error: true,
      onChangeCallback: this.props.onChangeCallback || (() => {}),
      onLoadCallback: this.props.onLoadCallback || (() => {}),
      displayName: this.props.displayName || "nombre"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.onLoad();
  }

  onLoad() {
    if (this.props.data && this.props.data.length > 0) {
      this.setState(
        {
          selectedItem: this.props.data[0],
          error: false
        },
        () => {
          this.state.onLoadCallback(this.state.selectedItem);
        }
      );
    } else {
      this.setState(
        {
          noDataLoadedError: true,
          error: true
        },
        () => {
          this.state.onLoadCallback(this.state.selectedItem);
        }
      );
    }
  }

  handleChange(event) {
    const newSelectedItemStringRepresentation = event.target.value;
    this.setState(
      {
        selectedItem: JSON.parse(newSelectedItemStringRepresentation)
      },
      /**
       * Friendly remainder para esto y para todos
       *
       * Lo que se pone de callback, debe ser una función anónima,
       * ya que lleva un parámetro y si en vez de () => { funcion(valor) }
       * ponemos funcion(valor) estamos pasando el resultado de la función
       * y no ella misma como callback, por lo que **no** tendrá el efecto
       * deseado
       *
       * (o eso creo)
       */
      () => {
        this.state.onChangeCallback(this.state.selectedItem);
      }
    );
  }

  renderOptions() {
    return (
      this.props.data &&
      this.props.data.map((element, key) => {
        return (
          <option key={"element-" + key} value={JSON.stringify(element)}>
            {element[this.state.displayName]}
          </option>
        );
      })
    );
  }

  renderError(renderGenericErrorOnly = false) {
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
    return <select onChange={this.handleChange}>{this.renderOptions()}</select>;
  }

  render() {
    return (
      <div>{this.state.error ? this.renderError() : this.renderSelect()}</div>
    );
  }
}
