import "../assets/CSS_JS/global.css";
import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/"); // Redirection si pas connecté
      return;
    }
    setUser(storedUser);

    const loadData = async () => {
      try {
        // Récupération des utilisateurs et catways
        const [usersRes, catwaysRes] = await Promise.all([
          fetch(`${API_URL}/api/users`),
          fetch(`${API_URL}/api/catways`),
        ]);

        if (!usersRes.ok || !catwaysRes.ok) throw new Error("Erreur serveur");

        const users = await usersRes.json();
        const catways = await catwaysRes.json();

        const tableRows = [];

        for (const catway of catways) {
          // Trouver le propriétaire du catway
          const owner = users.find(
            u => String(u._id) === String(catway.user) || u.email === catway.user
          );
          if (!owner) continue;

          // Récupérer les réservations pour ce catway
          const res = await fetch(`${API_URL}/api/catways/${catway.catwayNumber}/reservations`);
          if (!res.ok) continue;

          const reservations = await res.json();
          if (!Array.isArray(reservations) || reservations.length === 0) continue;

          for (const r of reservations) {
            tableRows.push({
              userName: owner.username,
              userEmail: owner.email,
              catwayNumber: catway.catwayNumber,
              catwayType: catway.catwayType,
              boatName: r.boatName,
              clientName: r.clientName,
              startDate: r.startDate,
              endDate: r.endDate,
            });
          }
        }

        setRows(tableRows);
      } catch (err) {
        console.error("Erreur Dashboard :", err);
      }
    };

    loadData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-md custom-navbar">
          <div className="container-fluid nav-content">
            <div className="collapse navbar-collapse show">
              <ul className="navbar-nav me-auto nav-list">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Dashboard">Tableau de bord</Link>
                </li>
                <li className="nav-item">
                  <button className="btn-logout" onClick={logout}>
                    Déconnexion
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main style={{ textAlign: "center" }}>
        <h2>Tableau de bord</h2>

        {user && (
          <p>
            Connecté en tant que <strong>{user.username}</strong> ({user.email})
          </p>
        )}

        <p style={{ fontWeight: "bold" }}>{new Date().toLocaleDateString()}</p>

        <h3>Utilisateurs · Catways · Réservations</h3>

        {rows.length === 0 ? (
          <p>Aucune réservation valide à afficher</p>
        ) : (
          <table border="1" cellPadding="8" style={{ margin: "0 auto", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Email</th>
                <th>Catway</th>
                <th>Type</th>
                <th>Bateau</th>
                <th>Client</th>
                <th>Début</th>
                <th>Fin</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>{row.userName}</td>
                  <td>{row.userEmail}</td>
                  <td>{row.catwayNumber}</td>
                  <td>{row.catwayType}</td>
                  <td>{row.boatName}</td>
                  <td>{row.clientName}</td>
                  <td>{new Date(row.startDate).toLocaleDateString()}</td>
                  <td>{new Date(row.endDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>

      <footer style={{ marginTop: "auto" }}>
        <div className="footer-container">
          <section className="footer-section-2">
            <Link to="/CRUD_catways">Catways</Link> |{" "}
            <Link to="/CRUD_reservation">Réservations</Link> |{" "}
            <Link to="/CRUD_users">Utilisateurs</Link> |{" "}
            <Link to="/Documentation_API">Documentation de l'API</Link>
          </section>
        </div>
      </footer>
    </div>
  );
}