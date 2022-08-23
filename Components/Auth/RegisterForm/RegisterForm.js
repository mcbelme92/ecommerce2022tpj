import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

export default function RegisterForm(props) {
  const { showLoginForm } = props;
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const Formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      //se hace asincrona para que termine de ejecutar el registro y despues siga la siguiente linea
      const response = await registerApi(formData);
      //si response se registra con exito devuelveme a login form sino error al registrar usuario
      if (response?.jwt) {
        toast.success("Registro exitoso");
        showLoginForm();
      } else {
        toast.error(
          "Error al registrar usuario, intentelo con otro nombre de usuario o correo"
        );
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={Formik.handleSubmit}>
      <Form.Input
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={Formik.handleChange}
        error={Formik.errors.name}
      />
      <Form.Input
        name="lastname"
        type="text"
        placeholder="Apellidos"
        onChange={Formik.handleChange}
        error={Formik.errors.lastname}
      />
      <Form.Input
        name="username"
        type="text"
        placeholder="Nombre de usuario"
        onChange={Formik.handleChange}
        error={Formik.errors.username}
      />
      <Form.Input
        name="phone"
        type="text"
        placeholder="Telefono"
        onChange={Formik.handleChange}
        error={Formik.errors.phone}
      />
      <Form.Input
        name="email"
        type="text"
        placeholder="Correo electronico "
        onChange={Formik.handleChange}
        error={Formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={Formik.handleChange}
        error={Formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={showLoginForm}>
          Inicar Sesion
        </Button>
        <Button type="submit" className="submit" loading={loading}>
          {" "}
          registrar
        </Button>
      </div>
    </Form>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };
}
// formik validacion de formulario
function validationSchema() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return {
    name: Yup.string().required("nombre es obligatorio"),
    lastname: Yup.string().required("Apellido es obligatorio"),
    username: Yup.string()
      .required("nombre de usuario")
      .min(6, "username minimo 6 caracteres"),
    phone: Yup.string()
      .matches(phoneRegExp, "Numero telefonico invalido")
      .min(8, "Numero telefonico minimo de 8 digitos"),
    email: Yup.string().email("email incorrecto").required(true),
    password: Yup.string()
      .required("sin contrasña")
      .min(8, "Contraseña es corta minimo 8 caracteres")
      .matches(
        /[A-Za-z][A-Za-z0-9@#%&*]/,
        "No debe de ser secuencial, se recomienda letras con numeros con caracteres especiales"
      ),
  };
}
