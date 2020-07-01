import React, { useState, useEffect } from "react";

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

const Cronometro = () => {
  const [clock, setClock] = useState({
    horas: 0,
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
  });

  const [running, setRunning] = useState(false);
  const [allTimestamps, setallTimesStamps] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        tick();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [running, clock]);

  /*class Cronometro extends Component {
  state = {
    horas: 0,
    minutos: 0,
    segundos: 0,
    milisegundos: 0,
    running: false,
    allTimestamps: [],
    started: false,
  };*/

  const handleStart = () => {
    if (!running) {
      setStarted(true);
      setRunning(true);
    }
  };

  const tick = () => {
    let { horas, minutos, segundos, milisegundos } = clock;
    milisegundos = milisegundos + 1;

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

    updaterTime(milisegundos, segundos, minutos, horas);
  };

  const updaterTime = (milisegundos, segundos, minutos, horas) => {
    setClock({ milisegundos, segundos, minutos, horas });
  };

  const addZero = (value) => (value < 10 ? `0${value}` : value);

  let { horas, minutos, segundos, milisegundos } = clock;
  horas = addZero(horas);
  minutos = addZero(minutos);
  segundos = addZero(segundos);
  milisegundos = addZero(milisegundos);

  const handleStop = () => {
    if (running) {
      setRunning(false);
    }
  };

  const handleTimeStamp = () => {
    const timestamp = {
      horas: clock.horas,
      minutos: clock.minutos,
      segundos: clock.segundos,
      milisegundos: clock.milisegundos,
    };
    setallTimesStamps([...allTimestamps, timestamp]);
  };

  const handleReset = () => {
    if (running || !running) {
      updaterTime(0, 0, 0, 0);
      setallTimesStamps([]);
      setStarted(false);
    }
  };

  return (
    <>
      <h3>{`${horas} : ${minutos} : ${segundos} : ${milisegundos}`}</h3>
      <Button disabled={running} onClick={handleStart}>
        START
      </Button>
      <Button disabled={!running} onClick={handleStop}>
        STOP
      </Button>
      <Button disabled={!running} onClick={handleTimeStamp}>
        TIMESTAMP
      </Button>
      {started && (
        <Button disabled={running} onClick={handleReset}>
          RESET
        </Button>
      )}
      <List>
        {allTimestamps.map((timestamp, idx) => (
          <li key={id()}>
            {`${idx + 1} - 
            ${addZero(timestamp.horas)}
            ${addZero(timestamp.minutos)}
            ${addZero(timestamp.segundos)}
            ${addZero(timestamp.milisegundos)}`}
          </li>
        ))}
      </List>
    </>
  );
};

export default Cronometro;
