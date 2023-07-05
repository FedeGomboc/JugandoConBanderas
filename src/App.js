import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [listaPaises, SetListaPaises] = useState([]);
  const [paisRandom, SetPaisRandom] = useState(null);
  const [puntos, SetPuntos] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [nombre, SetNombre] = useState("");

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  useEffect(() => {
    cargarBanderas();
  }, []);

  const cargarBanderas = async () => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((result) => {
        SetListaPaises(result.data.data);
      });
  };

  const cargarBanderaRandom = () => {
    let numRandom = Math.floor(Math.random() * listaPaises.length);
    SetPaisRandom(listaPaises[numRandom]);

    setTimeLeft(15);

    document.getElementById("botonBandera").style.display = "none";
    document.getElementById("ingresoNombre").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("muestraPuntos").style.display = "block";
    document.getElementById("timer").style.display = "block";
  };

  const chequearRespuesta = (e) => {
    e.preventDefault();

    let respuesta = e.target.respuesta.value;

    if (respuesta === paisRandom.name) {
      cargarBanderaRandom();
      SetPuntos(puntos + timeLeft);

      document.getElementById(
        "resultado"
      ).textContent = `¡Correcto, ganaste ${timeLeft} puntos por terminar antes de tiempo!`;
    } else {
      cargarBanderaRandom();
      SetPuntos(puntos - 1);

      document.getElementById(
        "resultado"
      ).textContent = `¡Incorrecto, perdiste un punto!`;
    }

    e.target.respuesta.value = "";
  };

  const handleChange = (e) => {
    SetNombre(e.target.value);
  };

  return (
    <div className="container">
      <center>
        <h1>ADIVINA LA BANDERA</h1>

        <h2 id="muestraPuntos" style={{ display: "none" }}>
          PUNTOS DE {nombre}: {puntos}
        </h2>
        <h2 id="timer" style={{ display: "none" }}>
          Tiempo restante: {timeLeft}
        </h2>

        {paisRandom && (
          <div>
            <img
              src={paisRandom.flag}
              style={{ height: "200px", width: "auto" }}
              alt="bandera"
            />
          </div>
        )}

        <div id="ingresoNombre">
          <input type="text" onChange={handleChange} placeholder="Ingresar nombre"/>
          <button onClick={cargarBanderaRandom} id="botonBandera">COMENZAR EL JUEGO</button>
        </div>

        <div id="form" style={{ display: "none" }}>
          <form onSubmit={(e) => chequearRespuesta(e)}>
            <input type="text" name="respuesta"></input>
            <button type="submit">Chequear respuesta</button>
          </form>
        </div>

        <h2 id="resultado"></h2>
      </center>
    </div>
  );
}

export default App;
