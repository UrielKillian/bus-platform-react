import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexView from "./views/index.view";
import IndexPlatformView from "./views/platform/index.view";
import TicketPlatforView from "./views/platform/tickets.view";
import IndexAdminView from "./views/admin/index.view";
import LoginView from "./views/auth/login.view";
// CSS Framework
import "./assets/styles/index.css";
// Redux
import { store } from "../src/redux/store.ts";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexView />} />
        <Route path="/platform" element={<IndexPlatformView />} />
        <Route path="/platform/tickets" element={<TicketPlatforView />} />
        <Route path="/admin" element={<IndexAdminView />} />
        <Route path="/login" element={<LoginView />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
