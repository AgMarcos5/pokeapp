import React, { useState } from 'react'
import { useAuth, useForm } from '../../hooks';

const formData = {
  email: "",
  password: "",
  displayName: "",
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
  displayName: [
    [(value) => value.length >= 1, "El nombre es obligatorio"],
    [(value) => value.length >= 6, "El nombre debe tener al menos 6 letras"]
  ],
};


export const Register = () => {
  const {startRegister} = useAuth()
  const [formSubmited, setFormSubmited] = useState(false);  

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if(!isFormValid) return;
    startRegister(formState);
  };


  return (
    <div>
        REGISTER 
        
        <form onSubmit={onFormSubmit}>
            <input 
              type="text"
              placeholder="Nombre de usuario"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
            />
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
              Registrar
            </button>
            

        </form>

        <hr/>
    </div>
  )
}
