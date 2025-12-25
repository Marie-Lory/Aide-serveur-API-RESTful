import "../assets/CSS_JS/global.css";
import { Link } from "react-router-dom";

export default function CRUD_users() {
  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-md custom-navbar">
            <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "2rem"}}>
              <li><Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Acceuil</Link></li>
              <li><Link to="/Dashboard" style={{ color: "#ffffff", textDecoration: "none" }}>Tableau de bord</Link></li>
            </ul>
        </nav>
      </header>
      <main>
        <h2>Page 1 — Utilisateurs (Users)</h2>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Méthode</th>
              <th>URL</th>
              <th>Paramètres</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td>/api/users</td>
              <td>—</td>
              <td>Récupère tous les utilisateurs</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/users/:email</td>
              <td>email (string)</td>
              <td>Récupère un utilisateur par son email</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/users</td>
              <td>JSON body : username, email, password</td>
              <td>Crée un nouvel utilisateur</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/users/:email</td>
              <td>email (string), JSON body : champs à remplacer (username, email, password)</td>
              <td>Met à jour entièrement un utilisateur identifié par son email</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/users/:email</td>
              <td>email (string), JSON body : champs à modifier</td>
              <td>Met à jour partiellement un utilisateur identifié par son email</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/users/:email</td>
              <td>email (string)</td>
              <td>Supprime un utilisateur par son email</td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer style={{ marginTop: "auto" }}>
        <div className="footer-container">
          <section className="footer-section-2">
            <Link to="/CRUD_catways">Catways</Link> |{" "}
            <Link to="/CRUD_reservation">Réservations</Link> |{" "}
            <Link to="#">Utilisateurs</Link> |{" "}
            <Link to="/Documentation_API">Documentation de l'API</Link> |{" "}
          </section>
        </div>
      </footer>
    </div>
  );

}
