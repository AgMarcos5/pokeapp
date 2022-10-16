import React, { useEffect, useState } from 'react'
import { useAuth, useForm } from '../../hooks';
import googleIcon from "../../assets/img/auth/google.png"

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

export const Login = ({setAuthState}) => {

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
    if(!isFormValid) {
      setAuthState("invalid")
    }
    else {
      setAuthState("valid")
      startLogin({ email, password });
    }
  };

  const onGoogleSignIn = () => {
    startGoogleLogin();
  };

  
  useEffect(() => {
    setAuthState('valid')
  }, [isFormValid])
  


  return (
    <div>
    <p>Iniciar sesión</p>
        
        <form onSubmit={onFormSubmit}>
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
                Conectar
              </button>
              
              <button  className="google" type="button" onClick={onGoogleSignIn}>
                <img src={googleIcon} alt="google"/>
              </button>
            </div>
           

        </form>

    </div>
  )
}
