import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = { 
      secreto: "",
      respuesta: ""
    }

    this.btnAdivinar_Click = this.btnAdivinar_Click.bind(this);
    this.txtSecreto_OnTextChange = this.txtSecreto_OnTextChange.bind(this);
  }

  txtSecreto_OnTextChange(event) {
    this.setState({
      secreto: event.target.value
    });
  }

  btnAdivinar_Click() {
    Axios.get('http://localhost:5000/adivinarsecreto/' + this.state.secreto)
      .then(res => {
        let response = res.data

        this.setState({
          respuesta: response
        });
      })
      .catch(err => {

        this.setState({
          respuesta: "Hubo un error consultando el servicio"
        });

        console.log(err)
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">David Santacoloma y Estoy Solo :/ - CodeBreaker</h1>
        </header>
        <br/>
        Ingrese el secreto:
        <input type="text" onChange={this.txtSecreto_OnTextChange} />
        <input type="submit" value="Adivinar" onClick={this.btnAdivinar_Click} />
        <br/>
        Resultado: <p>{this.state.respuesta}</p>
      </div>
    );
  }
}

export default App;
