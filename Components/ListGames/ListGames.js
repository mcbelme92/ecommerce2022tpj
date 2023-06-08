import React from "react";
import { Grid, GridColumn, GridRow, Card } from "semantic-ui-react";
import { map } from "lodash";
import Link from "next/link";
import Image from "next/image";
import useWindowSize from "../../hooks/UseWindowSize";
import {
  breakpointUpSm,
  breakpointUpMd,
  breakpointUpLg,
  breakpointUpXl,
} from "../../utils/breakpoints";

export default function ListGames(props) {
  const { games } = props;
  const { width } = useWindowSize();

  const getColumnsRender = () => {
    //1200
    if (width >= breakpointUpXl) {
      return 5;
    } else if (width > breakpointUpLg) {
      return 4;
    } else if (width > breakpointUpMd) {
      return 3;
    } else if (width >= breakpointUpSm) {
      return 2;
    } else {
      return 1;
    }
  };

  // columns={getColumnsRender()}

  return (
    <div className="list-games">
      <Grid>
        <GridRow columns={getColumnsRender()}>
          {map(games, (game, index) => (
            //games inicial
            <GamesRender games={game?.attributes} key={index} />
          ))}
        </GridRow>
      </Grid>
    </div>
  );
}
//CUANDO SE RENDERIZA COMO COMPONETE APARTE Y SE LE PASA POR PROPS SE TOMA ENCUENTA DESDE ESTE GAMES
function GamesRender(props) {
  // informacion del videojuego desestructurada
  const { games } = props;
  if (!games) {
    return undefined;
  }
  const urlGame = games?.url;
  const poster = games.poster.data.attributes.url;
  const descuento = games.discount;
  const precioGame = games.price;
  const tituloGame = games.title;
  // className="col-md-4 col-xs-6 list-games__game"
  return (
    <GridColumn>
      <Link href={`/${urlGame}`} passHref>
        <div as="a" className="shell">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="wsk-cp-product">
                  <div className="img-container"></div>
                  <div className="wsk-cp-img">
                    <Image
                      src={poster}
                      alt="Product"
                      className="img-responsive"
                      width={1024}
                      height={1200}
                    />
                  </div>
                  <div className="wsk-cp-text">
                    {/* <div className="category">
                    <span>{tituloGame}</span>
                  </div> */}
                    <div className="title-product">
                      <h3>{tituloGame} </h3>
                    </div>
                    <div className="description-prod">
                      <p>{games.summary}</p>
                    </div>
                    <div className="card-footer">
                      <div className="wcf-left">
                        {descuento ? (
                          <div className="d-flex justify-content-between align-items-center p-2 first">
                            <span className="percent">
                              {descuento}% de descuento
                            </span>
                            <span className="wishlist">
                              <i className="fa fa-heart"></i>
                            </span>
                          </div>
                        ) : (
                          // CAMPO INVISBLE ALT + 0160
                          <div className="d-flex justify-content-between align-items-center p-2 first">
                            <span className="percent"> </span>
                            <span className="wishlist">
                              <i className="fa fa-heart"></i>
                            </span>
                          </div>
                        )}
                        <span className="price">USD${precioGame}</span>
                      </div>
                      {/* <div className="wcf-right">
                      <a href="#" className="buy-btn">
                        <i className="zmdi zmdi-shopping-basket"></i>
                      </a>
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </GridColumn>
  );
}

//ANOTACIONES USADAS
//  informacion de multimedia Imagenes desestructuracion anidada
//  const {
//    games: {
//      poster: {
//        data: {
//          attributes: { url },
//        },
//      },
//    },
//  } = props;
// imagen de poster en una variable
//  const ImagesPoster = games.poster.data.attributes.url;
