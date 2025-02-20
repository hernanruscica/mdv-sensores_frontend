
import { Link  } from "react-router-dom";
import styles from  "./Footer.module.css";

const Footer = () => {
  
  return (
    <footer className={styles.footer}>
      <section className={styles.footerSection}>
        <h2>Enlaces</h2>
        <ul>
          <li>
            <Link to="/">Qué es MDV Sensores? </Link>
          </li>
          <li>
            <Link to="/contacto">Escríbanos</Link>
          </li>
          <li>
            <Link to="/inicio">Ingrese con sus credenciales</Link>
          </li>
          <li>
            <Link to="/panel/usuarios/resetear">Olvidó sus credenciales?</Link>
          </li>
        </ul>
      </section>
      <section className={styles.footerSection}>
        <h2>Contacto</h2>
        <ul>
          <li>
            <span>📲 11 3180-0908</span>
          </li>
          <li>
            <span>📧 mdvsrl@gmail.com</span>
          </li>
          <li>
            <span>📍🗺️ Florencio Varela 1545 - Gerli</span>
          </li>
          <li>
            <span>🕓 8:00 hs. a 13:00 hs. y 14:00 hs. a 17:00 hs.</span>
          </li>
        </ul>
      </section>
      <section className={styles.footerSection}>
        <p>
          © El contenido de este sitio web está protegido por la Ley N° 11.723
          de Propiedad Intelectual de Argentina. Su reproducción, distribución o
          uso no autorizado están prohibidos y pueden ser sancionados
          legalmente. Para consultas, contáctenos.
        </p>
      </section>
    </footer>
  );
};

export default Footer;
