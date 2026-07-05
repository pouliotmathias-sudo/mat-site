import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className={styles.logo}>
              Mat<span className={styles.dot}>.</span>
            </p>
            <p className={styles.tagline}>{site.tagline}</p>
          </div>

          <nav className={styles.cols} aria-label="Pied de page">
            <div className={styles.col}>
              <p className="t-meta">Explorer</p>
              <Link href="/videos">Vidéos</Link>
              <Link href="/articles">Articles</Link>
              <Link href="/a-propos">À propos</Link>
              <Link href="/contact">Contact</Link>
            </div>
            <div className={styles.col}>
              <p className="t-meta">Suivre</p>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer">
                YouTube
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </div>
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Mat — Tous droits réservés</p>
          <p>Québec, Canada</p>
        </div>
      </div>
    </footer>
  );
}
