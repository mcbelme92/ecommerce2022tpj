import React, { useState, useEffect } from "react";
import { deleteAddressApi, getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import { map as mapep, size } from "lodash";
import { Grid, Button } from "semantic-ui-react";
import { toast } from "react-toastify";
//fue el componente  que me costo mas trabajo en configurar ya que
// hubo detalles en obtener el objeto ya que en strapi v4 no estaba habilitado relation ni sus campos
// y tambien desestructurar en la apiget la informacion y en el mapeo poner las keys adecuadas ya que desconocia un poco del tema
export default function ListAddress(props) {
  //account props
  const { setreloadAddress, reloadAddress, openModal } = props;

  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      //si resposne tiene contenido lo vas a añadir si esta vacio o null solo pones un contenedor
      setAddresses(response || []);
      //vovlerlo a su estado original
      setreloadAddress(false);
    })();
    //se le indica que use efffect se vuevla ejecutar cuando reloadAddress cambie de valor y envie una nueva peticion
  }, [reloadAddress]);

  //sirve para que no salga el mensaje de no hay niguna
  if (!addresses) {
    return null;
  }

  return (
    <>
      <div className="list-address">
        {/* si eltamaño de size es identico a 0 muetrame esto sino pintame la informacion */}
        {size(addresses) === 0 ? (
          <h3>No hay ninguna direccion creada</h3>
        ) : (
          //este caso es muy especial ya que se modifico la APIGET se hizo una desestructuracion
          //despues se hizo otra a nivel objeto ya que venia las key id,atributes
          //como vemos se mapea el array address despues queda suelto por objeto de ahi se le pone el key.id y key.attributes
          //con eso queda funcionando correctamente(en la version curso es diferente asi que esta manera se descubrio pro si misma ya que NO VIENE EN EL CURSO)
          <Grid>
            {mapep(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <AddressRender
                  address={address.attributes}
                  addressId={address.id}
                  setreloadAddress={setreloadAddress}
                  logout={logout}
                  openModal={openModal}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </>
  );
}

function AddressRender(props) {
  // el id y las propiedades del formualri ode address viene completamente separadas se tiene que extraer cada una idependiente
  const { address, addressId, setreloadAddress, logout, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(addressId, logout);
    // si es true
    if (response) {
      toast.warn("La direccion se ha Eliminado correctamente!!");
      setreloadAddress(true);
    }
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.address}</p>
      <p>
        {address.city}
        {address.state}
        {address.postalCode}
        {address.country}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() =>
            //se envian por props addresss y addresId al funcion openmodal
            //despues se reciben y se envian a otros componentes que fue a account.js
            openModal(` Editar: ${address.title}`, address, addressId)
          }
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
