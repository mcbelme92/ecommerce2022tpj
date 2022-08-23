import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayouts/index";
import { getMeApi } from "../api/user";
import { Icon } from "semantic-ui-react";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../Components/Account/ChangeNameForm/index";
import ChangeEmailForm from "../Components/Account/ChangeEmailForm/ChangeEmailForm";
import ChangePasswordForm from "../Components/Account/ChangePasswordForm/ChangePasswordForm";
import ChangePhoneForm from "../Components/Account/ChangePhoneForm/ChangePhoneForm";
import ChangeAddressForm from "../Components/Account/ChangeAddressForm";
import BasicModal from "../Components/Modal/BasicModal";
import AddressForm from "../Components/Account/AddressForm/AddressForm";
import ListAddress from "../Components/Account/ListAddress";
import Seo from "../Components/Seo";

export default function Account() {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setRealoaderUser } = useAuth();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      //si response existe se lo pasas si no le pasas null
      setUser(response || null);
    })();
    //siempre cuando auth cambie de valor o sea otro usuario
  }, [auth]);

  if (user === undefined) return null;
  //si auth es nulo y user tambien significa que el usuario no esta logueado
  if (!auth && !user) {
    //se manda ala home
    router.replace("/");
    return null;
  }
  return (
    <BasicLayout className="account">
      <Seo title="Configuracion de cuenta" />
      {/* 1-manda primero propiedad user a configuration  */}
      {/* PADRE */}
      <Configuration
        user={user}
        logout={logout}
        setRealoaderUser={setRealoaderUser}
      />
      <Addresses />
    </BasicLayout>
  );
}

function Configuration(props) {
  const { user, logout, setRealoaderUser } = props;
  return (
    <div className="account__configuration">
      <div className="title">Configuracion</div>
      <div className="data">
        {/* 2-DESPUES MANDA POR PROPS LAS PROPIEDADES DE USER A CHANGEnAMEfORM */}
        {/* HIJO */}
        <ChangeNameForm
          user={user}
          logout={logout}
          setRealoaderUser={setRealoaderUser}
        />
        <ChangeEmailForm
          user={user}
          logout={logout}
          setRealoaderUser={setRealoaderUser}
        />
        <ChangePasswordForm user={user} logout={logout} />
        <ChangePhoneForm
          user={user}
          logout={logout}
          setRealoaderUser={setRealoaderUser}
        />
        <ChangeAddressForm
          user={user}
          logout={logout}
          setRealoaderUser={setRealoaderUser}
        />
      </div>
    </div>
  );
}

function Addresses() {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddress, setReloadAddress] = useState(false);
  //modalForm
  //se reciben por props a open modal address y addressId
  //se envian al componente adddressForm para su uso
  const openModal = (title, address, addressId) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setreloadAddress={setReloadAddress}
        setShowModal={setShowModal}
        // si address tiene contenido sera false va hacer una actualizacion sino tiene contenido va ser true va crear ua neuva direccion
        //sivve para que funcione el boton editar false si es true servira el boton + para crear una nueva direccion de envio
        //addres con infor se vuelve false y sin informacion es true
        newAddress={address ? false : true}
        address={address || null}
        IdAddresses={addressId}
      />
    );
    setShowModal(true);
  };
  return (
    <div className="account__addresses">
      <div className="title">direcciones de envio</div>
      <div className="title2">
        <Icon name="plus" link onClick={() => openModal("Nueva direccion")} />
        Añade nueva direccion de envio
      </div>
      <div className="data">
        <ListAddress
          reloadAddress={reloadAddress}
          setreloadAddress={setReloadAddress}
          openModal={openModal}
        />
      </div>
      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
}
