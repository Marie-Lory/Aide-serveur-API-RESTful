import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CRUD_users from "./pages/CRUD_users.jsx";
import CRUD_catways from "./pages/CRUD_catways.jsx";
import CRUD_reservation from "./pages/CRUD_reservation.jsx";
import Documentation_API from "./pages/Documentation_API.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CRUD_catways" element={<CRUD_catways />} />
        <Route path="/CRUD_reservation" element={<CRUD_reservation />} />
        <Route path="/CRUD_users" element={<CRUD_users />} />
        <Route path="/Documentation_API" element={<Documentation_API />} />
      </Routes>
    </BrowserRouter>
  );
}
