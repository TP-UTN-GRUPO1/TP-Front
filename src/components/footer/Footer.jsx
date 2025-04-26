import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>Sobre Nosotros</h4>
          <p>
            Estudiantes de la Tecnicatura de Programación en la UTN de Rosario.
            <br />
            Integrantes:
            <br />
            La Rana
            <br />
            Santi Chewi
            <br />
            Kiki Lopez
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li>
              <a href="/about">Sobre Nosotros</a>
            </li>
            <li>
              <a href="/contact">Contáctanos</a>
            </li>
            <li>
              <a href="/terms">Términos y Condiciones</a>
            </li>
            <li>
              <a href="/privacy">Política de Privacidad</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>Seguinos en las redes</h4>
          <ul>
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} TheFrog. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
