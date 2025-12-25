import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CRUD_catways from "./pages/CRUD_catways";
import CRUD_reservation from "./pages/CRUD_reservation";
import CRUD_users from "./pages/CRUD_users";
import Ducumentation_API from "./pages/Documentation_API";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/CRUD_catways" element={<CRUD_catways />} />
        <Route path="/CRUD_reservation" element={<CRUD_reservation />} />
        <Route path="/CRUD_users" element={<CRUD_users />} />
        <Route path="/Documentation_API" element={<Ducumentation_API />} />
      </Routes>
    </BrowserRouter>
  );
}