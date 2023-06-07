import React, { useState, useEffect } from "react";
import { Container, Menu, Grid, Icon, Label } from "semantic-ui-react";
import Link from "next/link";
import BasicModal from "../../Modal/index";
import Auth from "../../Auth";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import { map, _ } from "lodash";
import { getMeApi } from "../../../api/user";
import ResponsiveRender from "../../../utils/responsiveRender";
import { getPlatformsApi } from "../../../api/platform";

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Iniciar Sesion");
  const [user, setUser] = useState(undefined);
  const { logout, auth } = useAuth();

  useEffect(() => {
    //funcion asincrona anonima que se autollama
    (async () => {
      //datos del usuario
      const response = await getMeApi(logout);
      setUser(response);
    })();
    //cuando cambie usuario o de token
  }, [auth]);

  useEffect(() => {
    //funcion anonima asincrona para la api 02platforms
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  const onShowModal = () => {
    setShowModal(true);
  };
  const onCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="menu">
      <Container>
        <Grid stackable>
          {map(platforms, (platform, index) => (
            <Grid.Column
              className="menu__left"
              mobile={1}
              tablet={1}
              computer={1}
              /* width={1} */
              key={index}
            >
              <MenuPlatforms platform={platform.attributes} />
            </Grid.Column>
          ))}
          <Grid.Column
            className="menu__right"
            mobile={16}
            tablet={16}
            computer={12}
            /* width={12} */
          >
            {/* si user es diferente a UNDEFINED singiifica que la peticion response ya ha sido ejecutada y el user esta logueado sino es undefined */}
            {user !== undefined && (
              <MenuOptions
                onShowModal={onShowModal}
                user={user}
                logout={logout}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
      <BasicModal
        show={showModal}
        setShow={setShowModal}
        title={titleModal}
        size="small"
      >
        <Auth onCloseModal={onCloseModal} setTitleModal={setTitleModal} />
      </BasicModal>
    </div>
  );
}

function MenuPlatforms(props) {
  const { platform } = props;

  return (
    <Menu>
      <Link href={`/games/${platform.url}`}>
        <Menu.Item as="a" name={platform.url}>
          {platform.title}
        </Menu.Item>
      </Link>
    </Menu>
  );
}

function MenuOptions(props) {
  const { onShowModal, user, logout } = props;
  const { productsCart } = useCart();

  const onModal = () => {
    onShowModal(true);
  };
  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orders" passHref>
            <Menu.Item as="a">
              <Icon name="game" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist" passHref>
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Favoritos
            </Menu.Item>
          </Link>
          <Link href="/account" passHref>
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart" passHref>
            <Menu.Item as="a">
              <Icon name="cart" className="m-0" />
              Carrito
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item onClick={logout}>
            <Icon name="power off" />
            Cerrar Sesion
          </Menu.Item>
        </>
      ) : (
        <Menu.Item onClick={onModal}>
          <Icon name="user outline" />
          Mi cuenta
        </Menu.Item>
      )}
    </Menu>
  );
}
