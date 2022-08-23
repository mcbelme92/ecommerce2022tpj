import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updateNameApp } from "../../../api/user";
// NIETO
export default function ChangeNameForm(props) {
  const { user, logout, setRealoaderUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(user),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateNameApp(user.id, formData, logout);

      if (!response) {
        toast.error("Error al actualizar el nombre y apellidos del usuario");
      } else {
        setRealoaderUser(true);
        toast.success("Nombre y apellidos actualizado");
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-name-form">
      <h4>Cambia tu nombre y apellidos</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="name"
            placeholder="Tu nuevo Nombre"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <Form.Input
            name="lastname"
            placeholder="Tu nuevo Apellido"
            onChange={formik.handleChange}
            value={formik.values.lastname}
            error={formik.errors.lastname}
          />
        </Form.Group>
        <Button className="submit" type="submit" loading={loading}>
          Actualizar
        </Button>
      </Form>
    </div>
  );
}

function initialValues(props) {
  const { name, lastname } = props;

  return {
    // si name llega lo pones sino queda vacio
    name: name || "",
    lastname: lastname || "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
  };
}
