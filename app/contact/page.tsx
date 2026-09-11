import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écrire à Mathias Pouliot : question sur une vidéo, collaboration, invitation ou conférence. Réponse habituellement en dedans de 48 h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section--tight">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.intro}>
          <Reveal>
            <div className="eyebrow-row">
              <span className="t-meta">Contact</span>
            </div>
          </Reveal>
          <Reveal delay={89}>
            <h1 className="t-god">
              Écrivez-moi<span className="t-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={178}>
            <p className="t-lead">
              Une question sur une vidéo, une idée de collaboration, une
              invitation à un balado ou à un événement ? Le formulaire arrive
              directement dans ma boîte. Je réponds habituellement en dedans de
              48&nbsp;h.
            </p>
          </Reveal>

          <Reveal delay={267}>
            <aside className={styles.algoNote}>
              <p className="t-meta">Vous dirigez une PME ?</p>
              <p>
                Pour sortir de l&apos;opérationnel, passez directement par
                l&apos;audit offert de The ALGORITM : un appel de 30 minutes.
              </p>
              <a
                className="link-u"
                href={site.algoritm.audit}
                target="_blank"
                rel="noopener noreferrer"
              >
                Réserver sur the-algoritm.io →
              </a>
            </aside>
          </Reveal>

          <Reveal delay={356}>
            <div className={styles.socials}>
              <p className="t-meta">Ou retrouvez-moi ici</p>
              <div className={styles.socialRow}>
                <a
                  className="link-u"
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="link-u"
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
                <a
                  className="link-u"
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={178} className={styles.formCol}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
