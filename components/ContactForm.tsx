"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Formulaire de contact via Web3Forms — le courriel de destination est
 * configuré côté Web3Forms (lié à la clé d'accès), jamais exposé ici.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-bot : si le champ caché est rempli, on ignore.
    if (data.get("_gotcha")) return;

    if (!site.web3formsKey) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    data.append("access_key", site.web3formsKey);
    data.append("from_name", "Site Mat — formulaire de contact");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className={styles.done} role="status">
        <p className="t-bloc">Reçu ✓</p>
        <p style={{ color: "var(--ink-2)" }}>
          Ton message est parti. Je te reviens habituellement en dedans de
          48&nbsp;h.
        </p>
        <button className="btn btn--ghost" onClick={() => setStatus("idle")}>
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {/* Honeypot invisible pour les bots */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className={styles.gotcha}
        aria-hidden="true"
      />

      <div className={styles.row}>
        <label className={styles.field}>
          <span className="t-meta">Nom *</span>
          <input name="name" type="text" required placeholder="Ton nom" />
        </label>
        <label className={styles.field}>
          <span className="t-meta">Téléphone</span>
          <input
            name="phone"
            type="tel"
            placeholder="(418) 555-0123"
            autoComplete="tel"
          />
        </label>
      </div>

      <label className={styles.field}>
        <span className="t-meta">Raison *</span>
        <select name="raison" required defaultValue="">
          <option value="" disabled>
            Choisis une raison…
          </option>
          <option>Question sur une vidéo</option>
          <option>Collaboration / partenariat</option>
          <option>Invitation (podcast, événement…)</option>
          <option>Juste jaser</option>
          <option>Autre</option>
        </select>
      </label>

      <label className={styles.field}>
        <span className="t-meta">Objet *</span>
        <input
          name="subject"
          type="text"
          required
          placeholder="En deux mots, c'est à propos de quoi ?"
        />
      </label>

      <label className={styles.field}>
        <span className="t-meta">Message *</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Écris ton message ici…"
        />
      </label>

      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Envoi en cours…" : "Envoyer"}{" "}
        <span className="arr">→</span>
      </button>

      {status === "error" && (
        <p className={styles.error} role="alert">
          Oups — l&apos;envoi a échoué. Réessaie dans une minute, ou écris-moi
          directement sur LinkedIn.
        </p>
      )}
    </form>
  );
}
