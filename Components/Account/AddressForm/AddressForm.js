import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { map } from "lodash";
import countryList from "../../../data/countryList";
import useAuth from "../../../hooks/useAuth";
import { createAddressApi, updateAddressApi } from "../../../api/address";
import { toast } from "react-toastify";

export default function AddressForm(props) {
  const { setShowModal, setreloadAddress, address, newAddress, IdAddresses } =
    props;

  const [loading, setLoading] = useState(false);
  const { auth, logout } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(address),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: (formData) => {
      // si newaddress es true crea una nueva direccion sino muestrame updateAddress

      newAddress ? createAddress(formData) : updateAddress(formData);
    },
  });
  //ACTUALIZA UNA NUEVA DIRECCION
  const updateAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      ...formData,
      user: auth.idUser,
    };
    //se le paso formulario y el idde las direcciones
    const response = await updateAddressApi(IdAddresses, formDataTemp, logout);
    // si response es false
    if (!response) {
      toast.warning("error al actualizar la direccion");
    } else {
      formik.resetForm();
      setreloadAddress(true);
      setLoading(false);
      setShowModal(false);
    }
  };
  //CREA UNA NUEVA DIRECCION
  const createAddress = async (formData) => {
    setLoading(true);
    const formDataTemp = {
      //agregar la data que tiene formData y agregarle el id a esta informacion ya almacenada
      ...formData,
      user: auth.idUser,
    };
    //peticion ala api creada oara enviar la info
    const response = await createAddressApi(formDataTemp, logout);
    if (!response) {
      toast.warning("Error al crear la direccion");
      setLoading(false);
    } else {
      toast.success("Direccion de envio agregada correctamente!");
      //cuando se cree una nueva direccion correctamente cambie el estado del setreloadaddres para que listAddress vuelva ahcer la peticion recuepre nuevas direcicon
      setreloadAddress(true);
      formik.resetForm();
      setLoading(false);
      setShowModal(false);
    }
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="title"
        type="text"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
        label="titulo de la direccion"
        placeholder="Titulo de la direccion"
      />
      <Form.Group widths="equal">
        <Form.Input
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.errors.name}
          label="Nombre y apellidos"
          placeholder="Nombre y apellidos"
        />
        <Form.Input
          name="phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
          label="Telefono"
          placeholder="Numero de telefono"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="city"
          type="text"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.errors.city}
          label="Ciudad"
          placeholder="Ciudad"
        />
        <Form.Input
          name="state"
          type="text"
          value={formik.values.state}
          onChange={formik.handleChange}
          error={formik.errors.state}
          label="Estado/Provincia"
          placeholder="Estado/Provincia"
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          list="countrys"
          name="country"
          label="Pais"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.errors.country}
          type="country"
          id="country"
          placeholder="Introduce tu Pais"
        />
        <datalist id="countrys">
          {map(countryList, (country, index) => (
            <option col="30" rows="10" key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </datalist>
        <Form.Input
          name="postalCode"
          type="text"
          value={formik.values.postalCode}
          onChange={formik.handleChange}
          error={formik.errors.postalCode}
          label="Codigo Postal"
          placeholder="Codigo Postal"
        />
      </Form.Group>
      <Form.Input
        name="address"
        type="text"
        value={formik.values.address}
        onChange={formik.handleChange}
        error={formik.errors.address}
        label="Direccion"
        placeholder="Ingrese direccion"
      />

      <div className="actions">
        <Button className="submit" type="submit" loading={loading}>
          {newAddress ? "Crear direccion" : "Actulizar direccion"}
        </Button>
      </div>
    </Form>
  );
}

function initialValues(address) {
  return {
    title: address?.title || "",
    name: address?.name || "",
    address: address?.address || "",
    city: address?.city || "",
    state: address?.state || "",
    postalCode: address?.postalCode || "",
    phone: address?.phone || "",
    country: address?.country || "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name: Yup.string().required(true),
    address: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    postalCode: Yup.number().required(true).max(123456, "maximo 5 digitos"),
    phone: Yup.number().required(true).max(123456789123, "maximo 12 digitos"),
    country: Yup.string().max(21, "maximo 16 caracteres").required(true),
  };
}
