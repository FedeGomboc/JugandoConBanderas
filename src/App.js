import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [listaPaises, SetListaPaises] = useState([]);
  const [paisRandom, SetPaisRandom] = useState(null);

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

    document.getElementById("botonBandera").style.display = "none";
    document.getElementById("form").style.display = "block";
  };

  const chequearRespuesta = (e) => {
    e.preventDefault();

    let respuesta = e.target.respuesta.value;

    if (respuesta === paisRandom.name) {
      console.log("correcto");
      cargarBanderaRandom();
    } else {
      console.log("incorrecto");
    }

    e.target.respuesta.value = "";
  };

  return (
    <div>
      <center>
        <h1>ADIVINA LA BANDERA</h1>

        {paisRandom && (
          <div>
            <p>{paisRandom.name}</p>
            <img
              src={paisRandom.flag}
              style={{ height: "200px", width: "auto"}}
              alt="bandera"
            />
          </div>
        )}

        <button onClick={cargarBanderaRandom} id="botonBandera">COMENZAR EL JUEGO</button>

        <div id="form" style={{ display: "none" }}>

          <form onSubmit={(e) => chequearRespuesta(e)}>
            <input type="text" name="respuesta"></input>
            <button type="submit">Chequear respuesta</button>
          </form>

        </div>

        <div id="resultado"></div>

      </center>
    </div>
  );
}

export default App;
