import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
// Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexView from "./views/index.view";
import IndexPlatformView from "./views/platform/index.view";
import TicketPlatforView from "./views/platform/tickets.view";
import IndexAdminView from "./views/admin/index.view";
// CSS Framework
import "./assets/styles/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<IndexView />} />
      <Route path="/platform" element={<IndexPlatformView />} />
      <Route path="/platform/tickets" element={<TicketPlatforView />} />
      <Route path="/admin" element={<IndexAdminView />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
