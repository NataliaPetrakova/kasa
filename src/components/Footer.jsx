import logoWhite from '../assets/LOGO_FOOTER.png'

function Footer() {
  return (
    <footer>
      <img src={logoWhite} alt="Kasa" className="footer-logo" />
      <p>© 2020 Kasa. All rights reserved</p>
    </footer>
  )
}

export default Footer