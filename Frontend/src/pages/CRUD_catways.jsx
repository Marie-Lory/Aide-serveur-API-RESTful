import "../assets/CSS_JS/global.css";
import { Link } from "react-router-dom";

export default function CRUD_catways() {
  return (
    <div className="App">
      <header>
        <nav className="navbar navbar-expand-md custom-navbar">
          <div className="container-fluid nav-content">
            <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "2rem"}}>
              <li><Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Acceuil</Link></li>
              <li><Link to="/Dashboard" style={{ color: "#ffffff", textDecoration: "none" }}>Tableau de bord</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <h2>Page 2 — Catways</h2>
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
              <td>/api/catways</td>
              <td>—</td>
              <td>Récupère tous les catways</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/catways/:id</td>
              <td>id (ObjectId Mongo)</td>
              <td>Récupère un catway par son _id</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/catways</td>
              <td>JSON body : catwayNumber (Number), catwayType ('long'/'short'), catwayState, user (ObjectId)</td>
              <td>Crée un nouveau catway</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/catways/:id</td>
              <td>id (ObjectId), JSON body : catwayType, catwayState, userEmail</td>
              <td>Met à jour entièrement un catway et son utilisateur</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/catways/:id</td>
              <td>id (ObjectId), JSON body : champs à modifier (catwayType, catwayState, userEmail)</td>
              <td>Met à jour partiellement un catway et/ou son utilisateur</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/catways/:id</td>
              <td>id (ObjectId)</td>
              <td>Supprime un catway par son _id</td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer style={{ marginTop: "auto" }}>
        <div className="footer-container">
          <section className="footer-section-2">
            <Link to="#">Catways</Link> |{" "}
            <Link to="/CRUD_reservation">Réservations</Link> |{" "}
            <Link to="/CRUD_users">Utilisateurs</Link> |{" "}
            <Link to="/Documentation_API">Documentation de l'API</Link> |{" "}
          </section>
        </div>
      </footer>
    </div>
  );

}
