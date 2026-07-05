"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Header.module.css";

const nav = [
  { href: "/videos", label: "Vidéos" },
  { href: "/articles", label: "Articles" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo} onClick={() => setOpen(false)}>
          Mat<span className={styles.dot}>.</span>
        </Link>

        <nav
          className={`${styles.nav} ${open ? styles.navOpen : ""}`}
          aria-label="Navigation principale"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`${styles.navLink} ${
                pathname?.startsWith(item.href) ? styles.active : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className={styles.burger}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span className={`${styles.bar} ${open ? styles.barTop : ""}`} />
          <span className={`${styles.bar} ${open ? styles.barBot : ""}`} />
        </button>
      </div>
    </header>
  );
}
