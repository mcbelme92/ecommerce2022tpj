import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
//padre de login y registro
export default function Auth(props) {
    const {onCloseModal, setTitleModal} = props;
    const [showLogin, setShowLogin] = useState(true);

    //Muestra Formulario de Login
    const showLoginForm = () => {
        setTitleModal("Iniciar Sesion");
        setShowLogin(true);
    }
    //muestra regostrp de usuario 
    const showRegisterForm = () => {
        setTitleModal("Crear nuevo usuario");
        setShowLogin(false);
    }

    return showLogin ? <LoginForm showRegisterForm={showRegisterForm} onCloseModal={onCloseModal} /> : <RegisterForm showLoginForm={showLoginForm} />;

}
