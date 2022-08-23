import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { updatePasswordApi } from "../../../api/user";

export default function ChangePasswordForm(props) {
  const { user, logout } = props;
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await updatePasswordApi(
        user.id,
        formData.password,
        logout
      );
      if (!response) {
        toast.error("Error en cambio de contraseña intente mas tarde");
      } else {
        logout();
        toast.success("Contraseña cambiada exitosamente!");
      }
      setLoading(false);
    },
  });
  return (
    <div className="change-password-form">
      <h4>Cambia tu contraseña</h4>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            name="password"
            type="password"
            placeholder="Nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
          />
          <Form.Input
            name="repeatpassword"
            type="password"
            placeholder="confirma tu nueva contraseña"
            onChange={formik.handleChange}
            value={formik.values.repeatpassword}
            error={formik.errors.repeatpassword}
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
    password: "",
    repeatpassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string()
      .required(true)
      .min(8, "Contraseña es corta minimo 8 caracteres")
      .matches(
        /[A-Za-z][A-Za-z0-9@#%&*]/,
        "No debe de ser secuencial, se recomienda letras con numeros y caracteres especiales"
      )
      .oneOf([Yup.ref("repeatpassword")], "las contraseñas no coincide"),
    repeatpassword: Yup.string()
      .required(true)
      .min(8, "Contraseña es corta minimo 8 caracteres")
      .matches(
        /[A-Za-z][A-Za-z0-9@#%&*]/,
        "No debe de ser secuencial, se recomienda letras con numeros y caracteres especiales"
      )
      .oneOf([Yup.ref("password")], "las contraseñas no coincide"),
  };
}
