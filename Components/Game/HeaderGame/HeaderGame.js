import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import {
  Grid,
  Image,
  Icon,
  Button,
  GridColumn,
  Loader,
} from "semantic-ui-react";
import {
  isFavoriteApiGet,
  addFavoriteApi,
  deleteFavoriteApi,
} from "../../../api/favorite";
import { size } from "lodash";
import classNames from "classnames";
import { toast } from "react-toastify";

export default function HeaderGame(props) {
  const { game } = props;

  const posterGame = game.attributes.poster.data.attributes.url;
  const titleGame = game.title;

  return (
    <Grid className="header-game">
      <GridColumn mobile={16} tablet={6} computer={5}>
        <Image src={posterGame} alt={titleGame} fluid />
      </GridColumn>
      <GridColumn mobile={16} tablet={10} computer={11}>
        <Info game={game} />
      </GridColumn>
    </Grid>
  );
}

function Info(props) {
  /* Una tarea de desestructuración. Es una forma de extraer datos de matrices u objetos en distintas
variables. */
  const { game } = props;

  /* Cálculo del precio total del juego. */
  const totalPrice =
    game.attributes.price -
    Math.floor(game.attributes.price * game.attributes.discount) / 100;
  /* Una variable a la que se le está asignando el valor del descuento. */
  const discountGame = game.attributes.discount;
  const [isFavorites, setIsFavorites] = useState(false);
  const [reloaderFavorites, setReloaderFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();
  const { addProductCart } = useCart();

  useEffect(() => {
    //lo que hace useeffect de un estado original lo cambia aotro y te va renderiszar el estado original despues el estado cambiado
    (async () => {
      // se le implmento el operado ? por que sirve para indicar como un posible si tiene
      // alo cual se le pone a una variable que reciba informacion en una apirest ya que muchas veces esta no enviara dicha informacion
      //ya que es inexistente pues se ejecuta con ciertas condiciones si estas son nulas va a ver error
      //como aqui que me dio error como usuario invitado
      const response = await isFavoriteApiGet(auth?.idUser, game.id, logout);
      //esta respuesta la hace en automatico ya que el componente que usa que es un corazon de icono se renderiza y al hacer esto
      //esta peticio nse ejecuta en automatico por eso se condicoino la renderizacion del icono de corazon ya que al no estar no se renderiza y no detecta los favoritos AUTENTIFICADOS
      //y por ende no madna error ya que la ser invitado no esta verificado el usuario y no causa el error de IDUSER ni el data
      if (size(response?.data) > 0) setIsFavorites(true);
      else setIsFavorites(false);
    })();
    setReloaderFavorites(false);

    //CADA VEZ QUE GAME CAMBIE SE VOLVERA A MANDAR UNA PETICION PaRA QUE ESTA SE EJECUTE
  }, [game, reloaderFavorites]);

  // Una función que agrega un favorito a la base de datos.
  const addFavoritos = async () => {
    //si AUTH es true significa que el usuario esta logueado puede agregar a favoritos sino no podria
    if (auth.idUser) {
      setLoading(true);
      await addFavoriteApi(auth.idUser, game.id, logout);
      setReloaderFavorites(true);
      setLoading(false);
      toast.success(`Se ha agregado a favoritos ${game.attributes.title}`);
    }
  };

  /**
   * Elimina los favoritos de la base de datos.
   */
  const deleteFavoritos = async () => {
    if (auth.idUser) {
      setLoading(true);
      const result = await deleteFavoriteApi(auth.idUser, game.id, logout);
      setReloaderFavorites(true);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="header-game__title">
        {game.attributes.title}
        {auth ? (
          <Icon
            name={isFavorites ? "heart" : "heart outline"}
            className={classNames({
              //LO PONE EN COLOR ROJO
              like: isFavorites,
            })}
            link
            // SI EL ESTADO DE FAVORITES ES TRUE EJECUTA DELETE SINO EJECUTA ADD
            onClick={isFavorites ? deleteFavoritos : addFavoritos}
            loading={loading}
          />
        ) : (
          ""
        )}
      </div>
      <div className="header-game__delivery">Entrega de 24 a 48 horas</div>
      <div
        className="header-game__summary"
        //se pone dangerous para poder editar deesde strapi con html para hacer la separacion
        dangerouslySetInnerHTML={{ __html: game.attributes.summary }}
      />

      <div className="header-game__buy">
        <div className="header-game__buy-price">
          <p>Precio de venta al publico: ${game.attributes.price} </p>
          <div className="header-game__buy-price-actions">
            {/* //si descuento tiene valor muestrame el descuento sino un string en blanco */}
            {/* Es un operador ternario. Es una declaración abreviada if/else.  */}
            {discountGame ? "Desc: " : ""}
            {discountGame ? <p> %{discountGame}</p> : ""}
            <p>Precio: ${totalPrice}</p>
          </div>
        </div>
        <div>
          <Button
            onClick={() => addProductCart(game.attributes.url)}
            className="header-game__buy-btn"
          >
            Comprar
          </Button>
        </div>
      </div>
    </>
  );
}
