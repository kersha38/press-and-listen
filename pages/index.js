import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import { botones } from "./api/botones.js";

function Boton(params) {
  const { boton } = params;
  let audioRef = React.createRef();

  const [play, setPlay] = React.useState(false);

  React.useEffect(() => {
    if (play) {
      audioRef.current.play();
    }
    setPlay(false);
  }, [play, audioRef]);

  return (
    <a className={styles.card} onClick={() => setPlay(true)}>
      <Image
        src={boton.imagen}
        alt={boton.descripcion}
        width={300}
        height={200}
        objectFit="contain"
      />
      <audio ref={audioRef}>
        <source src={boton.sonido} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <h2 align="center">{boton.descripcion}</h2>
    </a>
  );
}

export default function Home() {
  const shownPages = 4;
  const [page, setPage] = React.useState(0);
  const [botonesSeleccionados, setBotonesSeleccionados] = React.useState([]);

  React.useEffect(() => {
    const from = page * shownPages;
    const to = page * shownPages + shownPages;
    setBotonesSeleccionados(botones.slice(from, to));
  }, [page]);

  return (
    <div className={styles.container}>
      <title>Sonido de nombres</title>
      <div className={styles.titleCont}>
        <h1 className={styles.title}>Toca una imagen</h1>
        <Image
          alt="pocoyo indicando"
          src="/imagen/pocoyo.png"
          width="50"
          height="50"
          objectFit="contain"
          className={styles.pocoyo}
        />
      </div>
      <div className={styles.content}>
        <button
          className={styles.arrow}
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
        >
          &#11013;
        </button>
        <main className={styles.main}>
          <div className={styles.grid}>
            {botonesSeleccionados.map((boton) => (
              <Boton boton={boton} key={boton.descripcion} />
            ))}
          </div>
        </main>
        <button
          className={styles.arrow}
          onClick={() => setPage(page + 1)}
          disabled={page >= botones.length / shownPages - 1}
        >
          &#10145;
        </button>
      </div>
    </div>
  );
}
