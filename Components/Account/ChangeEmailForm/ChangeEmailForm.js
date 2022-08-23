import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateEmailApp } from "../../../api/user";
import { toast } from "react-toastify";

export default function ChangeEmailForm(props) {
  const { user, logout, setRealoaderUser } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updateEmailApp(user.id, formData, logout);

      if (!response || response?.data === null) {
        toast.error("no se pudo actualizar intente mas tarde");
      } else {
        setRealoaderUser(true);
        toast.success("Email actualizado correctamente!");
        formik.handleReset();
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-email-form">
      <h4>
        Cambia tu email <span>(Tu email actual: {user.email})</span>
      </h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="email"
            placeholder="Nuevo email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
          />
          <Form.Input
            name="repeatemail"
            placeholder="Confirmacion email"
            onChange={formik.handleChange}
            value={formik.values.repeatemail}
            error={formik.errors.repeatemail}
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
  return { email: "", repeatemail: "" };
}

function validationSchema() {
  return {
    email: Yup.string()
      .email(true)
      .required(true)
      .oneOf(
        [Yup.ref("repeatemail")],
        "El email no es el mismo favor de verificar"
      ),
    repeatemail: Yup.string()
      .email(true)
      .required(true)
      .oneOf([Yup.ref("email")], true),
  };
}
