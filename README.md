# Mat — site personnel (matlearned)

Site Next.js du personal branding YouTube de Mat : vidéos de la chaîne
[@matlearned](https://www.youtube.com/@matlearned), articles SEO tirés des
transcripts, page à propos et formulaire de contact.

## Design

- **Nombre d'or partout** : échelle typographique ×1.618 (god → héros →
  bloc → titre), espacements Fibonacci (8/13/21/34/55/89/144/233 px),
  sections en proportion 1.618:1, durées d'animation 382/618/1000 ms.
- **Grille Müller-Brockmann** 12 colonnes, conteneur 1200 px.
- **Palette** tirée du fond des vidéos YouTube : grège `#e3dad3`, crème
  `#f7f2ec`, brun-noir `#2a211a`, caramel `#96603c`.
- **Police** : Satoshi (Fontshare), variable, self-hosted dans
  `public/fonts/`.
- La forme organique du background vidéo est reprise en SVG
  (`components/OrganicShape.tsx`).

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
