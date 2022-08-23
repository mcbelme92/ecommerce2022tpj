import React from "react";
import CarouselScreen from "../CarouselScreen/index";
import moment from "moment";

export default function InfoGame(props) {
  const { game } = props;

  const videApiYoutube = game.attributes.video.replace("/watch?v=", "/embed/");

  const tag = document.createElement("script");
  /* Cargando la API de YouTube. */
  tag.src = "https://www.youtube.com/iframe_api";
  /* Está recibiendo la primera etiqueta de secuencia de comandos en la página. */
  const firstScriptTag = document.getElementsByTagName("script")[0];
  /* Insertar la etiqueta del script antes de la primera etiqueta del script. */
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  return (
    <>
      <div className="info-game">
        <iframe
          className="info-game__video"
          id="ytplayer"
          type="text/html"
          width="100%"
          height="100%"
          src={`${videApiYoutube}?autoplay=1&origin=http://localhost:3000`}
          frameBorder="0"
        />
        <CarouselScreen game={game} name={game.attributes.title} />
        <div className="info-game__content">
          <div dangerouslySetInnerHTML={{ __html: game.attributes.summary }} />
          <div className="info-game__content-date">
            <h4>Fecha de lanzamiento:</h4>
            {/* /* Usando la biblioteca moment.js para formatear la fecha. */}
            <p>{moment(game.releaseDate).format("LL")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
