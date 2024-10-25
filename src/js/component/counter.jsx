import React, { useState } from "react";
import Swal from 'sweetalert2'

function Counter() {
  const [centesimas, setCentesimas] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [playPause, setPlayPause] = useState(false);
  const [intervalID, setIntervalID] = useState(null);
  const [countDown, setCountDown] = useState(false);
  const [inputTime, setInputTime] = useState("");

  const formatTime = (value) => {

    return value < 10 ? `0${value}` : value;
  }


  function play(countDown) {
    console.log(countDown);

    if (countDown == false) {
      if (playPause == false) {
        const newIntervalID = setInterval(() => {
          setCentesimas((centesimas) => {
            if (centesimas === 99) {
              setCentesimas(0);
              setSegundos((segundos) => {
                if (segundos === 59) {
                  setSegundos(0);
                  setMinutos((minutos) => minutos + 1);
                }

                return segundos + 1;
              });
            }

            return centesimas + 1;
          });
        }, 10);

        setIntervalID(newIntervalID);
      } else {
        clearInterval(intervalID);
        setIntervalID(null);
      }

      setPlayPause(playPause == false);
      return;
    }

    // cuenta atras

    if (playPause == false) {
      const newIntervalID = setInterval(() => {

        setCentesimas((centesimas) => {
          if (centesimas === 0) {
            setCentesimas(99);
            setSegundos((segundos) => {
              if (segundos === 0) {
                setSegundos(59);
                setMinutos((minutos) => minutos - 1);
              }
              if (minutos == 0 && segundos === 0 && centesimas === 0) {
                Swal.fire({
                  title: "Cuenta atrás finalizada!",
                  confirmButtonColor: "grey",
                  background: "red",
                  color: "white"
                });
                // clickonreset()
                setCountDown(false)
                clearInterval(newIntervalID)
                return
              }
              return segundos - 1;
            });
          }

          return centesimas - 1;
        });

      }, 10);

      setIntervalID(newIntervalID);
    } else {
      clearInterval(intervalID);
      setIntervalID(null);
    }

    setPlayPause(playPause == false);
  }

  const clickonreset = () => {
    clearInterval(intervalID);
    setCentesimas(0);
    setSegundos(0);
    setMinutos(0);
    setPlayPause(false);
    setIntervalID(null);
    setCountDown(false)
  };



  function onSubmit(event) {
    event.preventDefault();

    const minuts = Number(inputTime.slice(0, 2))
    const seconds = Number(inputTime.slice(3))
    console.log(minuts, seconds);

    if (minuts > 59 || seconds > 59) {
      Swal.fire("Los minutos y segundos no pueden ser mayores que 59.");
      return;
    }

    setMinutos(minuts)
    setSegundos(seconds)
    setCentesimas(0)
    setCountDown(true)
    play()
  }


  // capturar input

  function onChange(event) {
    let value = event.target.value.replace(/\D/g, ""); // Remover caracteres no numéricos
    if (value.length > 4) value = value.slice(0, 4); // Limitar a 4 caracteres
    if (value.length > 2) value = `${value.slice(0, 2)}/${value.slice(2)}`; // Insertar `/` después de los primeros 2 dígitos
    setInputTime(value);
  }

  return (
    <>
      <div className="wraper">
        <div className="caja">
          <p className="titulo">· · · C H R O N O S· · ·</p>

          <div className="chronos">
            <div className="icon-clock me-3">
              <i className="fa-regular far fa-clock"></i>
            </div>
            <div>{formatTime(minutos)}</div>
            <div>:</div>
            <div>{formatTime(segundos)}</div>
            <div>.</div>
            <div>{formatTime(centesimas)}</div>
          </div>

          <button
            onClick={() => play(countDown)}
            className="stop"
            style={{ backgroundColor: playPause ? "red" : "green" }}
          >
            {playPause ? (
              <i className="fa fa-pause"></i>
            ) : (
              <i className="fa fa-play"></i>
            )}
            {playPause ? " PAUSE" : " START"}
          </button>

          <button onClick={clickonreset} className="reset">
            RESET
          </button>

          <form
            onSubmit={onSubmit}
            className="countainer m-4 d-flex justify-content-center "
          >
            <input
              required
              onChange={onChange}
              value={inputTime}
              type="text"
              className="setCountStart rounded"
              placeholder="mm/ss"
              maxLength="5" // Limitar a 5 caracteres
            />

            <button
              type="submit"
              className="startCountDown bg-dark text-white rounded"
            >
              CountDown!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Counter;
