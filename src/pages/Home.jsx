import "../assets/CSS_JS/global.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const login = async () => {
    const encodedEmail = encodeURIComponent(email);

    try {
      const res = await fetch(
        `${API_URL}/api/users/${encodedEmail}`
      );

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/Dashboard");

    } catch (err) {
        console.error("Erreur fetch :", err);
    }
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-md custom-navbar">
          <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "2rem" }}>
            <li className="nav-item"><Link className="nav-link" to="/">Accueil</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/Dashboard">Tableau de bord</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Port de plaisance Russell</h1>

        <p>
          Cette application permet de gérer les catways et les réservations.
          Connectez-vous pour accéder à votre tableau de bord.
        </p>

        <div className="login-form">
          <input
            type="text"
            placeholder="Nom"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          {/* ❌ Message d’erreur */}
          {error && <p className="error-message">{error}</p>}

          <button
            onClick={login}
            disabled={!username.trim() || !email.trim()}
          >
            Connexion
          </button>
        </div>
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