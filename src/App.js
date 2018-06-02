import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = { 
      guardarSecreto: "",
      adivinarSecreto: "",
      respuestaGuardar: "",
      respuestaAdivinar: ""
    }

    this.txtCrearSecreto_OnTextChange = this.txtCrearSecreto_OnTextChange.bind(this);
    this.btnGuardar_Click = this.btnGuardar_Click.bind(this);
    this.txtAdivinarSecreto_OnTextChange = this.txtAdivinarSecreto_OnTextChange.bind(this);
    this.btnAdivinar_Click = this.btnAdivinar_Click.bind(this);
  }

  txtCrearSecreto_OnTextChange(event) {
    this.setState({
      guardarSecreto: event.target.value
    });
  }

  txtAdivinarSecreto_OnTextChange(event) {
    this.setState({
      adivinarSecreto: event.target.value
    });
  }

  btnGuardar_Click() {
    Axios.post('http://localhost:5000/setsecreto', { secret: this.state.guardarSecreto })
      .then(res => {
        let response = res.data

        this.setState({
          respuestaGuardar: response
        });
      })
      .catch(err => {

        this.setState({
          respuestaGuardar: "Hubo un error guardando el secreto"
        });

        console.log(err)
      })
  }

  btnAdivinar_Click() {
    Axios.get('http://localhost:5000/adivinarsecreto/' + this.state.adivinarSecreto)
      .then(res => {
        let response = res.data

        this.setState({
          respuestaAdivinar: response
        });
      })
      .catch(err => {

        this.setState({
          respuestaAdivinar: "Hubo un error adivinando el secreto"
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
        Crear secreto:
        <input type="text" onChange={this.txtCrearSecreto_OnTextChange} />
        <input type="submit" value="Guardar" onClick={this.btnGuardar_Click} />
        <br/>
        Resultado: <p>{this.state.respuestaGuardar}</p>
        <br/>
        <br/>
        <br/>
        Adivinar secreto:
        <input type="text" onChange={this.txtAdivinarSecreto_OnTextChange} />
        <input type="submit" value="Adivinar" onClick={this.btnAdivinar_Click} />
        <br/>
        Resultado: <p>{this.state.respuestaAdivinar}</p>
      </div>
    );
  }
}

export default App;
