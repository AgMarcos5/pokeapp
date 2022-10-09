import React, { useState } from 'react'
import { useAuth, useForm } from '../../hooks';

const formData = {
  email: "",
  password: ""
};

const formValidations = {
  email: [
    [(value) => value.includes("@"), "El correo debe tener un @"],
    [(value) => value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/
    ), "El correo debe tener un formato valido"]
  ],
  password: [
    [
    (value) => value.length >= 6,
    "La contraseña debe tener al menos 6 caracteres",
    ]
  ],
};

export const Login = () => {

  const {startLogin, startGoogleLogin} = useAuth()
  const [formSubmited, setFormSubmited] = useState(false);  

  const {
    formState,
    email,
    password,
    onInputChange,
    isFormValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return;
    startLogin({ email, password });
  };

  const onGoogleSignIn = () => {
    startGoogleLogin();
  };


  return (
    <div>
        LOGIN 
        
        <form onSubmit={onFormSubmit}>
            <input 
              type="email"
              placeholder="Correo"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            <input 
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            <button  type="submit">
              Login
            </button>
            
            <button  type="button" onClick={onGoogleSignIn}>
              Google
            </button>

        </form>

        <hr/>
    </div>
  )
}
