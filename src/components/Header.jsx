import { Link } from 'react-router-dom'
import('./Header.css');
import Logo from '../assets/img/logo.jpg'

function Header({title}) {
  return (
    <header>
      <img src={Logo} alt="" />
      <h1>{title}</h1>
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/about">À propos</Link>
        <Link to="/contact">Contactez-moi</Link>
      </nav>
    </header>
  )
}

export default Header
