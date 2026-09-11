# mathiaspouliot.com — site personnel de Mathias Pouliot

Site Next.js du personal branding de Mathias Pouliot, entrepreneur et
fondateur de [The ALGORITM](https://the-algoritm.io) : vidéos de la chaîne
[@mathias_pouliot](https://www.youtube.com/@mathias_pouliot), articles SEO
tirés des transcripts, page à propos et formulaire de contact.

C'est le site **perso** du fondateur, pas le site de l'entreprise : le logo
ALGORITM n'apparaît qu'à un seul endroit (le bloc « Ce que je bâtis » de
l'accueil).

## Design (v3, 2026-09-11 — refonte en noir)

- **Charte** : alignée sur celle de The ALGORITM
  (`algoritm-brain/00-systeme/DESIGN.md`), en version sombre — noir pur,
  blanc, bleu `#0662F8` par touches, ambre pour le focus clavier.
- **Trame sombre** (`public/brand/trame-dark-blue.svg`, tuile 900 px) en fond
  des hero et des bandeaux d'ouverture seulement ; jamais sous du texte
  courant ni sous un formulaire.
- **Polices** : Nunito (variable, texte) ; police ALGORITM réservée au nom
  « MATHIAS POULIOT » et aux numéros — capitales, jamais colorée, jamais
  sous 21 px, aucune capitale accentuée.
- **Nombre d'or** conservé : échelle ×1.618, espacements Fibonacci, sections
  1.618:1, grille 12 colonnes, conteneur 1200 px.
- **Assets** (polices, trame, logo, `og.png`, favicon) régénérés depuis le kit
  de marque par `python scripts/generer-assets-marque.py`.
- **Promesse ALGORITM** : seule la formulation officielle (`lib/site.ts`),
  aucun prix, aucun nom de programme, aucun chiffre de résultat.
- **Voix** : « je » + vouvoiement du lecteur sur les pages du site (les
  articles générés gardent leur ton d'origine).

## Commandes

```bash
npm run dev     # serveur local http://localhost:3000
npm run build   # build de production
python scripts/fetch-videos.py   # régénère data/videos.json depuis l'API YouTube
```

## Contenu

- `data/videos.json` — vidéos longues de la chaîne (générées par le script).
  Les vidéos programmées (publishAt futur) sont incluses mais n'apparaissent
  sur le site qu'une fois leur date passée (filtre au rendu).
- `content/articles/*.md` — un article par vidéo, frontmatter :
  `title, description, slug, videoId, date, keywords`. La date = date de
  publication de la vidéo ; un article dont la date est future reste caché
  jusque-là.
- `content/transcripts/` — transcripts sources (non publiés, servent à la
  rédaction).

### Publier une nouvelle vidéo + article

1. `python scripts/fetch-videos.py`
2. Écrire (ou faire écrire) `content/articles/mon-slug.md` avec le bon
   `videoId` et la date de mise en ligne de la vidéo
3. `npm run build` + redéploiement

## Formulaire de contact (Web3Forms)

Le courriel de destination n'apparaît **nulle part** dans le code — il est
lié à la clé d'accès Web3Forms.

1. Aller sur https://web3forms.com, entrer le courriel de réception,
   copier la clé reçue.
2. La coller dans `.env.local` → `NEXT_PUBLIC_WEB3FORMS_KEY=...`
3. Sur Vercel : Settings → Environment Variables → même variable.

Sans clé, le formulaire affiche un message d'erreur propre (pas de crash).

## Déploiement (Vercel recommandé)

1. Pousser le dossier sur un repo GitHub
2. vercel.com → Import Project → sélectionner le repo (Next.js auto-détecté)
3. Ajouter les 2 variables d'environnement (`NEXT_PUBLIC_WEB3FORMS_KEY`,
   `NEXT_PUBLIC_SITE_URL`)
4. Brancher le domaine dans Settings → Domains

## SEO inclus

- Metadata + OpenGraph par page, canonical
- `sitemap.xml` et `robots.txt` générés (`app/sitemap.ts`, `app/robots.ts`)
- JSON-LD : `Person` (à propos), `Article` + `VideoObject` (chaque article)
- `public/llm.txt` — présentation de la marque pour les moteurs IA
- Un article par vidéo = 25 pages indexables au lancement, mots-clés fr-CA
