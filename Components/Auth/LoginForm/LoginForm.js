import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";

export default function LoginForm(props) {
  const { showRegisterForm, onCloseModal } = props;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const Formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        login(response.jwt);
        const { user } = response;
        toast.success(`Bienvenido ${user.username}`);
        onCloseModal();
      } else {
        toast.error(
          "Error en el correo electronico o contraseña intentelo mas tarde"
        );
      }
      setLoading(false);
    },
  });

  const resetPasswordFun = () => {
    Formik.setErrors({});
    const validateEmail = Yup.string().email(true).required(true);

    if (!validateEmail.isValidSync(Formik.values.identifier)) {
      // const emailResetPass = resetPasswordApi(Formik.values.identifier);
      Formik.setErrors({ identifier: true });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={Formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electronico"
        onChange={Formik.handleChange}
        error={Formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={Formik.handleChange}
        error={Formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showRegisterForm}>
          Registrarse
        </Button>
        <div>
          <Button type="submit" className="submit" loading={loading}>
            Entrar
          </Button>
          <Button type="submit" onClick={resetPasswordFun}>
            Has olvidado la conraseña
          </Button>
        </div>
      </div>
    </Form>
  );
}
//validacion schema identifier se le pones asi al email en login pro que STRAPI asi lo requiere error={Formik.errors.identifier}
function initialValues() {
  return {
    identifier: "",
    password: "",
    username: "",
  };
}

// formik validacion de Login
function validationSchema() {
  return {
    identifier: Yup.string().email(true).required(true),
    password: Yup.string()
      .required(true)
      .min(8, "Contraseña es corta minimo 8 caracteres"),
  };
}
