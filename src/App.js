import React, { useState, useEffect } from 'react';
import axios from "axios"

function App() {
  const [banderas, setBanderas] = useState([]);
  const [randomBandera, setRandomBandera] = useState([])

  const cargarBanderas = async () => {
    axios
    .get("https://countriesnow.space/api/v0.1/countries/flag/images")
    .then((result) =>{
      setBanderas(result.data.data)     
    }) 
  }

  useEffect(() => {
    cargarBanderas()
  },[])

  const banderaRandom = () => {
    let numRandom = Math.floor(Math.random() * banderas.length)
    setRandomBandera(banderas[numRandom])
  }

  return (
    <div>
      <center><h1>ADIVINA LA BANDERA</h1></center>

      {randomBandera && (
        <div>
          <p>{randomBandera.name}</p>
          <img src={randomBandera.flag} style={{height:"200px", width:"auto"}}/>
        </div>
      )}  

      <button onClick={banderaRandom}>Bandera Aleatoria</button>
    </div>
  );
}

export default App;
