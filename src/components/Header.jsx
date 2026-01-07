import { Link } from 'react-router-dom'
import logo from '../assets/LOGO_BIG.png'

function Header() {
  return (
    <header>
      <img src={logo} alt="Kasa" className="logo" />
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/a-propos">A Propos</Link>
      </nav>
    </header>
  )
}

export default Header