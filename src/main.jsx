import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import PokeApp from "./PokeApp";
import { store } from "./store/store";

import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <BrowserRouter>
          <PokeApp />
      </BrowserRouter>
    </Provider>
);
