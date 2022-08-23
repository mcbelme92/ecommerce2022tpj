import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updatePhoneApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function ChangePhoneForm(props) {
  const { user, logout, setRealoaderUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePhoneApi(user.id, formData, logout);
      if (!response) {
        toast.error("No se pudo realizar cambio de numero intente mas tarde");
      } else {
        setRealoaderUser(true);
        formik.handleReset();
        toast.success("cambio de numero telefonico correcto");
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-phone-form">
      <h4>
        Cambia tu telefono
        <span>(tu numero de telefono actual:{user.phone}) </span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group>
          <Form.Input
            name="phone"
            type="phone"
            placeholder="Nuevo telefono"
            onChange={formik.handleChange}
            value={formik.values.phone}
            error={formik.errors.phone}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues() {
  return {
    phone: "",
  };
}

function validationSchema() {
  return {
    phone: Yup.number("No se puede ingresar letras solo NUMEROS"),
  };
}
