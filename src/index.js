import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./scss/style.scss";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Contexts from "./contexts";
import Shop from "./components/shop";
import NotFound from "./components/notFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Contexts>
      <BrowserRouter>
        <Routes>
          <Route path="/create" element={<Create />} />
          <Route path="/" element={<App />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Contexts>
  </React.StrictMode>
);
reportWebVitals();
