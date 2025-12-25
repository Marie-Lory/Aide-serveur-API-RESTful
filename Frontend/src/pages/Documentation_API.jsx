import "../assets/CSS_JS/global.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Documentation_API() {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <header>
        <nav className="navbar navbar-expand-md custom-navbar">
            <ul style={{ display: "flex", justifyContent: "center", listStyle: "none", gap: "2rem"}}>
              <li><Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>Acceuil</Link></li>
              <li><Link to="/Dashboard" style={{ color: "#ffffff", textDecoration: "none" }}>Tableau de bord</Link></li>
            </ul>
        </nav>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1>Documentation Complète de l'API</h1>
        <p>Cette documentation décrit toutes les routes disponibles, les paramètres requis et le fonctionnement de chaque endpoint de l'API.</p>

        {/* --- Utilisateurs --- */}
        <h2>1. Utilisateurs (Users)</h2>
        <table border="1" cellPadding="8" style={{ margin: "0 auto", textAlign: "left" }}>
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
              <td>Récupère tous les utilisateurs enregistrés.</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/users/:email</td>
              <td>email (string)</td>
              <td>Récupère un utilisateur spécifique par son email.</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/users</td>
              <td>JSON body : username, email, password</td>
              <td>Crée un nouvel utilisateur dans la base de données.</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/users/:email</td>
              <td>email (string), JSON body : champs complets à remplacer</td>
              <td>Met à jour entièrement un utilisateur identifié par son email.</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/users/:email</td>
              <td>email (string), JSON body : champs à modifier</td>
              <td>Met à jour partiellement un utilisateur identifié par son email.</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/users/:email</td>
              <td>email (string)</td>
              <td>Supprime un utilisateur spécifique par son email.</td>
            </tr>
          </tbody>
        </table>

        {/* --- Catways --- */}
        <h2>2. Catways</h2>
        <table border="1" cellPadding="8" style={{ margin: "0 auto", textAlign: "left" }}>
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
              <td>Récupère tous les catways existants.</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/catways/:id</td>
              <td>id (number)</td>
              <td>Récupère un catway spécifique par son identifiant.</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/catways</td>
              <td>JSON body : catwayNumber, catwayType, user</td>
              <td>Crée un nouveau catway et l'associe à un utilisateur.</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/catways/:id</td>
              <td>id (number), JSON body : champs complets</td>
              <td>Met à jour entièrement un catway par son ID.</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/catways/:id</td>
              <td>id (number), JSON body : champs à modifier</td>
              <td>Met à jour partiellement un catway par son ID.</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/catways/:id</td>
              <td>id (number)</td>
              <td>Supprime un catway spécifique par son ID.</td>
            </tr>
          </tbody>
        </table>

        {/* --- Réservations --- */}
        <h2>3. Réservations (Reservations)</h2>
        <table border="1" cellPadding="8" style={{ margin: "0 auto", textAlign: "left" }}>
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
              <td>/api/catways/:id/reservations</td>
              <td>id (number)</td>
              <td>Récupère toutes les réservations pour un catway donné.</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>id (number), idReservation (string)</td>
              <td>Récupère une réservation spécifique par ID pour un catway donné.</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/catways/:id/reservations</td>
              <td>JSON body : startDate, endDate, guests, clientName, boatName</td>
              <td>Crée une réservation pour un catway donné.</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>JSON body : champs complets à remplacer</td>
              <td>Met à jour entièrement une réservation existante.</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>JSON body : champs à modifier</td>
              <td>Met à jour partiellement une réservation existante.</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>idReservation (string)</td>
              <td>Supprime une réservation spécifique.</td>
            </tr>
          </tbody>
        </table>
      </main>

      <footer style={{ marginTop: "auto" }}>
        <div className="footer-container">
          <section className="footer-section-2">
            <Link to="/CRUD_catways">Catways</Link> |{" "}
            <Link to="/CRUD_reservation">Réservations</Link> |{" "}
            <Link to="/CRUD_users">Utilisateurs</Link> |{" "}
            <Link to="#">Documentation de l'API</Link>
          </section>
        </div>
      </footer>
    </div>
  );
}