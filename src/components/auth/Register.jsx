import React, { useEffect, useState } from 'react'
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


export const Register = ({setAuthState}) => {
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
    if(!isFormValid) {
      setAuthState("invalid")
    } else {
      setAuthState("valid")
      startRegister(formState);
    }
  };

  useEffect(() => {
    setAuthState('valid')
  }, [isFormValid])
  


  return (
    <div>
        <p>Crear cuenta nueva</p>
        
        <form onSubmit={onFormSubmit}>
            <input 
              className={(!!displayNameValid && formSubmited) ? 'errorInput' : ''}
              type="text"
              autoComplete="off"
              placeholder="Nombre de usuario"
              name="displayName"
              value={displayName}
              onChange={onInputChange}
            />
            
            <div className='error'>
            {!!displayNameValid && formSubmited && <span>{displayNameValid}</span>}
            </div>


            <input 
              className={(!!emailValid && formSubmited) ? 'errorInput' : ''}
              type="email"
              autoComplete="off"
              placeholder="Correo"
              name="email"
              value={email}
              onChange={onInputChange}
            />
            
            <div className='error'>
            {!!emailValid && formSubmited && <span>{emailValid}</span>}
            </div>


            <input 
              className={(!!passwordValid && formSubmited) ? 'errorInput' : ''}
              type="password"
              autoComplete="off"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onInputChange}
            />
            
            <div className='error'>
            {!!passwordValid && formSubmited && <span>{passwordValid}</span>}
            </div>

            <div className='buttons'>
              <button  type="submit">
                Registrar
              </button>
            </div>
            

        </form>

    </div>
  )
}
