import React, { Component } from "react";

import { generate as id } from "shortid";

import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? "transparent" : "#387EF5")};
  border: ${({ disabled }) => (disabled ? "1px solid #387EF5" : "none")};
  outline: none;
  border-radius: 15px;
  padding: 0.5rem;
  margin: 0.5rem;
  color: ${({ disabled }) => (disabled ? "#444" : "#fff")};
`;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

class Cronometro extends Component {
  state = {
    horas: 0,
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
    running: false,
    allTimestamps: [],
    started: false,
  };

  handleStart = () => {
    if (!this.state.running) {
      this.interval = setInterval(() => {
        this.tick();
      }, 100);
      this.setState({ running: true, started: true });
    }
  };

  handleStop = () => {
    if (this.state.running) {
      clearInterval(this.interval);
      this.setState({ running: false });
    }
  };

  handleTimeStamp = () => {
    const horas = this.state.horas;
    const minutos = this.state.minutos;
    const segundos = this.state.segundos;
    const milisegundos = this.state.milisegundos;
    const allTimestamps = this.state.allTimestamps;

    const timestamp = { horas, minutos, segundos, milisegundos };

    const timestamps = allTimestamps;

    timestamps.push(timestamp);

    this.setState({ allTimestamps: timestamps });
    console.log(timestamps);
  };

  handleReset = () => {
    if (this.state.running || !this.state.running) {
      this.updaterTime(0, 0, 0, 0);
      this.setState({ allTimestamps: [], started: false });
    }
  };

  tick() {
    let horas = this.state.horas;
    let minutos = this.state.minutos;
    let segundos = this.state.segundos;
    let milisegundos = this.state.milisegundos + 1;

    if (milisegundos === 10) {
      milisegundos = 0;
      segundos = segundos + 1;
    }

    if (segundos === 60) {
      segundos = 0;
      minutos = minutos + 1;
    }

    if (minutos === 60) {
      minutos = 0;
      horas = horas + 1;
    }

    this.updaterTime(milisegundos, segundos, minutos, horas);
  }

  updaterTime(milisegundos, segundos, minutos, horas) {
    this.setState({
      milisegundos,
      segundos,
      minutos,
      horas,
    });
  }

  addZero(value) {
    return value < 10 ? `0${value}` : value;
  }

  render() {
    let { horas, minutos, segundos, milisegundos, running } = this.state;
    horas = this.addZero(horas);
    minutos = this.addZero(minutos);
    segundos = this.addZero(segundos);
    milisegundos = this.addZero(milisegundos);

    return (
      <>
        <h3>{`${horas} : ${minutos} : ${segundos} : ${milisegundos}`}</h3>
        <Button disabled={running} onClick={this.handleStart}>
          START
        </Button>
        <Button disabled={!running} onClick={this.handleStop}>
          STOP
        </Button>
        <Button disabled={!running} onClick={this.handleTimeStamp}>
          TIMESTAMP
        </Button>
        {this.state.started && (
          <Button disabled={running} onClick={this.handleReset}>
            RESET
          </Button>
        )}
        <List>
          {this.state.allTimestamps.map((timestamp, idx) => (
            <li key={id()}>
              {`${idx + 1} - 
            ${this.addZero(timestamp.horas)}
            ${this.addZero(timestamp.minutos)}
            ${this.addZero(timestamp.segundos)}
            ${this.addZero(timestamp.milisegundos)}`}
            </li>
          ))}
        </List>
      </>
    );
  }
}

export default Cronometro;
