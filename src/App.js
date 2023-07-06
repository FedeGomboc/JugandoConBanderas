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
  const [mostrarAyuda, SetMostrarAyuda] = useState(false);

  useEffect(() => {
    if (!timeLeft) {
      cargarBanderaRandom();
      SetPuntos(puntos - 1);
      SetMostrarAyuda(false)
      return;
    }

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
    console.log(listaPaises[numRandom].name)

    document.getElementById("botonBandera").style.display = "none";
    document.getElementById("ingresoNombre").style.display = "none";
    document.getElementById("form").style.display = "block";
    document.getElementById("muestraPuntos").style.display = "block";
    document.getElementById("timer").style.display = "block";
  };

  const chequearRespuesta = (e) => {
    e.preventDefault();

    let respuesta = e.target.respuesta.value;

    if (respuesta.toLowerCase() === paisRandom.name.toLowerCase()) {
      cargarBanderaRandom();
      SetPuntos(puntos + timeLeft);
      SetMostrarAyuda(false)

      document.getElementById("resultado").textContent = `¡Correcto, ganaste ${timeLeft} puntos por terminar antes de tiempo!`;
    } else {
      cargarBanderaRandom();
      SetPuntos(puntos - 1);
      SetMostrarAyuda(false)

      document.getElementById("resultado").textContent = `¡Incorrecto, perdiste un punto!`;
    }

    e.target.respuesta.value = "";
  };

  const handleChange = (e) => {
    SetNombre(e.target.value);
  };

  const obtenerAyuda = () => {
    if (paisRandom) {
      SetMostrarAyuda(true);

      
    }
  }

  return (
    <div className="container">
      <center>
        <h1>ADIVINA LA BANDERA</h1>

        <h2 id="muestraPuntos" style={{ display: "none" }}>Puntos de {nombre}: {puntos}</h2>
        <h2 id="timer" style={{ display: "none" }}>Tiempo restante: {timeLeft}</h2>

        {paisRandom && (
          <div>
            <img src={paisRandom.flag} className="bandera" alt="bandera"/>
          </div>
        )}

        <div id="ingresoNombre">
          <input type="text" onChange={handleChange} placeholder="Ingresar nombre" />
          <button className="startButton" onClick={cargarBanderaRandom} id="botonBandera">COMENZAR EL JUEGO</button>
        </div>

        <div id="form" style={{ display: "none" }}>
          <form onSubmit={(e) => chequearRespuesta(e)}>
            <input type="text" name="respuesta"></input>
            <button type="submit">Chequear respuesta</button>
            <button type="button" onClick={() => obtenerAyuda()}>Obtener ayuda</button>
            <h1 id="guionesAyuda" style={{ display: mostrarAyuda ? "block" : "none" }}>{paisRandom && "- ".repeat(paisRandom.name.length)}</h1>
          </form>
        </div>

        <h2 id="resultado"></h2>
      </center>
    </div>
  );
}

export default App;
