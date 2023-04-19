import React, { useState } from "react";
import { Image, icon, Icon } from "semantic-ui-react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import BasicModal from "../../Modal/BasicModal";

export default function OrderInfo(props) {
  const { order } = props;

  const {
    game,
    totalPayment,
    idPayment,
    adressesShipping,
    createAt,
    publishedAt,
    updatedAt,
  } = order?.attributes;
  /* console.log(order?.attributes.game.data.attributes); */
  if (!game.data) {
    return null;
  }

  const { title, poster, url } = game.data?.attributes;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="order">
        <div className="order__info">
          <div className="order__info-data">
            <Link href={`/${url}`}>
              <a>
                <Image src={poster?.data.attributes?.url} alt={title} />
              </a>
            </Link>
            <div>
              <h2>{title}</h2>
              <p>Costo por orden: ${totalPayment}</p>
            </div>
          </div>
        </div>
        <div className="order__other">
          <p className="order__other-date">
            {moment(publishedAt).format("L")} -{" "}
            {moment(publishedAt).format("LT")}
          </p>
          <Icon name="eye" circular link onClick={() => setShowModal(true)} />
        </div>
      </div>

      <AddressModal
        showModal={showModal}
        setShowModal={setShowModal}
        adressesShipping={adressesShipping}
        idPayment={idPayment}
        title={title}
      />
    </>
  );
}

function AddressModal(props) {
  const { showModal, setShowModal, adressesShipping, idPayment, title } = props;

  return (
    <BasicModal
      show={showModal}
      setShow={setShowModal}
      size="tiny"
      title={!title && "titulo no diponible"}
    >
      <h3>id de la orden: {idPayment}</h3>
      <h4>{`El pedido se ha enviado :`}</h4>
      <div>
        <h4>
          {`
          Recibira el producto: ${adressesShipping.name} en la 
          direccion: ${adressesShipping.address}, estado :
          ${adressesShipping.state}, C.P.${adressesShipping.postalCode + "   "}
          ciudad:
          ${adressesShipping.city}, pais:${adressesShipping.country}`}
        </h4>
        <h5></h5>
      </div>
    </BasicModal>
  );
}
