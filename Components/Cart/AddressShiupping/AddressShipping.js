import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

export default function AdressShipping(props) {
  const { setAddresses } = props;
  const [address, setAddress] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getAddressApi(auth.idUser, logout);
      setAddress(response || []);
    })();
  }, []);

  return (
    <div className="address-shipping">
      <div className="title">Direccion de envio</div>
      <div className="data">
        {size(address) === 0 ? (
          <h3>
            No hay ninguna direccion creada{" "}
            <Link href="/account" passHref>
              <a>Añadir direccion de envio </a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(address, (adressess) => (
              <Grid.Column
                key={adressess.id}
                mobile={16}
                tablet={8}
                computer={4}
              >
                <Adress
                  adresses={adressess}
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddresses={setAddresses}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );

  function Adress(props) {
    const { adresses, addressActive, setAddressActive, setAddresses } = props;

    const changeAdresses = () => {
      setAddressActive(adresses.id);
      setAddresses(adresses);
    };
    return (
      <div
        className={classNames("adressess", {
          active: addressActive === adresses.id,
        })}
        onClick={changeAdresses}
      >
        <p>{adresses.attributes.title} </p>
        <p>{adresses.attributes.name} </p>
        <p>{adresses.attributes.address} </p>
        <p>
          {adresses.attributes.city}, {adresses.attributes.state}{" "}
          {adresses.attributes.postalCode}{" "}
        </p>
        <p>{adresses.attributes.phone} </p>
      </div>
    );
  }
}
