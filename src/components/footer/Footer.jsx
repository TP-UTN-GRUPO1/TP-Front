import { useTranslate } from "../../hooks/useTranslate";
import styles from "./Footer.module.css";

const Footer = () => {
  const translate = useTranslate()
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4>{translate("About_us")}</h4>
          <p>
            {translate("About_body")}
          </p>
          <span className={styles.spanFooter}>{translate("Members")}</span>
          <p>
            Saporiti Martin
            <br />
            Chieu Santiago
            <br />
            Lopez Quimey Alejo
          </p>
        </div>

        <div className={styles.footerSection}>
          <h4>{translate("Quick_Links")}</h4>
          <ul>
            <li>
              <a href="/contact">{translate("Contact_us")}</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h4>{translate("Follow_us")}</h4>
          <ul>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61577041709534"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/thefrogstorereact/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com/TheFrogStore"
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} TheFrog. {translate("All_rights_reserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
