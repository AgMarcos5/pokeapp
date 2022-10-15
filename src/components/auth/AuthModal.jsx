import React, { useEffect, useState } from "react";
import { CheckingAuth } from "./CheckingAuth";
import { Login } from "./Login";
import { Register } from "./Register";

import "../../styles/auth.scss";
import { useAuth } from "../../hooks";

export const AuthModal = () => {
  const { isLoading } = useAuth();

  const [page, setPage] = useState("login")

  return (
    <div className="authBg">
      <div className="authContainer">
        {isLoading ? (
            <CheckingAuth />
        ) : (
          <>
          {
            page === 'login' ? <Login /> : <Register />
          }
          </>
        )}
      </div>
    </div>
  );
};
