import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Écris à Mat — question sur une vidéo, collaboration, invitation ou juste pour jaser. Réponse habituellement en dedans de 48 h.",
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
              Écris-moi<span className="t-accent">.</span>
            </h1>
          </Reveal>
          <Reveal delay={178}>
            <p className="t-lead">
              Une question sur une vidéo, une idée de collaboration, une
              invitation — ou juste envie de jaser ? Le formulaire arrive
              directement dans ma boîte. Je réponds habituellement en dedans
              de 48&nbsp;h.
            </p>
          </Reveal>
          <Reveal delay={267}>
            <div className={styles.socials}>
              <p className="t-meta">Ou retrouve-moi ici</p>
              <div className={styles.socialRow}>
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
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
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
