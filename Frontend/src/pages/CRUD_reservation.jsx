import "../assets/CSS_JS/global.css";
import { Link } from "react-router-dom";

export default function CRUD_reservation() {
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
        <h2>Page 3 — Réservations (Reservations)</h2>
        <p>⚠️ Attention : les réservations sont une sous-ressource des catways, donc l’URL inclut le numéro ou l’id du catway.</p>
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
              <td>/api/catways/:id/reservations</td>
              <td>id (catwayNumber ou ObjectId)</td>
              <td>Récupère toutes les réservations d’un catway</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>id (catwayNumber), idReservation (ObjectId)</td>
              <td>Récupère une réservation précise d’un catway</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/catways/:id/reservations</td>
              <td>id (catwayNumber), JSON body : startDate, endDate, guests, clientName, boatName</td>
              <td>Crée une réservation pour le catway</td>
            </tr>
            <tr>
              <td>PUT</td>
              <td>/api/catways/:id/reservations</td>
              <td>id (catwayNumber), JSON body : champs à remplacer pour la première ou unique réservation</td>
              <td>Met à jour entièrement une réservation pour ce catway</td>
            </tr>
            <tr>
              <td>PATCH</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>id (catwayNumber), idReservation (ObjectId), JSON body : champs à modifier</td>
              <td>Met à jour partiellement une réservation spécifique</td>
            </tr>
            <tr>
              <td>DELETE</td>
              <td>/api/catways/:id/reservations/:idReservation</td>
              <td>id (catwayNumber), idReservation (ObjectId)</td>
              <td>Supprime une réservation spécifique</td>
            </tr>
          </tbody>
        </table>
      </main>
      <footer style={{ marginTop: "auto" }}>
        <div className="footer-container">
          <section className="footer-section-2">
            <Link to="/CRUD_catways">Catways</Link> |{" "}
            <Link to="#">Réservations</Link> |{" "}
            <Link to="/CRUD_users">Utilisateurs</Link> |{" "}
            <Link to="/Documentation_API">Documentation de l'API</Link> |{" "}
          </section>
        </div>
      </footer>
    </div>
  );

}
