import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { countryList } from "../../../data/countryList/countryList";
import { updateAddressApi } from "../../../api/user";
import { map } from "lodash";
import { toast } from "react-toastify";

export default function ChangeAddressForm(props) {
  const { user, logout, setRealoaderUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateAddressApi(user.id, formData, logout);
      // si response es nulo muestrame un error sino enviael cambio
      if (!response) {
        toast.error("No se pudo modificar tu direccion intente mas tarde");
      } else {
        setRealoaderUser(true);
        toast.success("direccion cambiada exitosamente!");
        formik.handleReset();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-address-form">
      <h4>
        Agrega tu direccion
        <span>
          (Tu direccion actual:
          {user.address ? user.address : "Actualizar informacion"}, Pais:
          {user.country ? user.country : "Actualizar informacion"}, Codigo
          Postal:
          {user.postalCode ? user.postalCode : "Actualizar informacion"} )
        </span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.errors.address}
            type="address"
            placeholder="Introduce tu Direccion"
          />

          <Form.Input
            list="countrys"
            name="country"
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
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            error={formik.errors.postalCode}
            type="postalCode"
            placeholder="Introduce tu Codigo Postal"
          />
        </Form.Group>
        <Button type="submit" className="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    address: "",
    country: "",
    postalCode: "",
  };
}

function validationSchema() {
  return {
    address: Yup.string().required("ingresa tu direccion"),
    country: Yup.string().max(21, "maximo 16 caracteres"),
    postalCode: Yup.number().max(123456, "maximo 5 caracteres"),
  };
}
