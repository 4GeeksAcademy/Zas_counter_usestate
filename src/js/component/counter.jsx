import React, { useState } from "react";

function Counter() {
  const [centesimas, setCentesimas] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [playPause, setPlayPause] = useState(false);
  const [intervalID, setIntervalID] = useState(null);

  const formatTime = (value) => {
    return value < 10 ? `0${value}` : value;
  }

  function play() {
    if (playPause == false) {
      const newIntervalID= setInterval(() => {
        setCentesimas((centesimas) => {
          if (centesimas == 100) {
            setCentesimas(0);
            setSegundos((segundos) => {
              if (segundos == 60) {
                setSegundos(0);
                setMinutos((minutos) => minutos + 1);
              }

              return segundos + 1;
            });
          }

          return centesimas + 1;
        });
      }, 10);

      setIntervalID(newIntervalID)
    }
    else {
      clearInterval(intervalID);
      setIntervalID(null);
    }
    setPlayPause(playPause ==false)

    

    
  }
  const contador = () => play()
  const clickonreset = ()=> {
    clearInterval(intervalID)
    setCentesimas(0)
    setSegundos(0)
    setMinutos(0)
    setPlayPause(false)
    setIntervalID(null)
  }
  
    
  
  

  return (
    <div>
      <div className="wraper">
        <div className="caja">
          <p className="titulo">CHRONOS</p>

          <p className="chronos">
            {formatTime(minutos)}:{formatTime(segundos)}.{formatTime(centesimas)}
          </p>

          <button onClick={play} className="stop"
          style={{
            backgroundColor: playPause ? "red" : "green"}}>
            {playPause ? "PAUSE" : "START"}
            
          </button>
          <button onClick = {clickonreset}className="reset">RESET</button>
        </div>
      </div>
    </div>
  );
}

export default Counter;

// const [segundos, setSegundos] = useState(0);
//   const [minutos, setMinutos] = useState(0);
//   const [horas, setHoras] = useState(0);

//   useEffect(() => {
//     setInterval(() => {
//       setSegundos((prev) => prev + 1);
//     }, 1000);
//   }, []);

//   useEffect(() => {
//     if (segundos === 60) {
//       setMinutos((prev) => prev + 1);
//       setSegundos(0);
//     }
//     if (minutos === 60) {
//       setHoras((prev) => prev + 1);
//       setMinutos(0);
//     }
//   }, [segundos]);
