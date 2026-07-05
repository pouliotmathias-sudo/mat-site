import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un vieux package-lock.json orphelin traîne dans le dossier utilisateur
  // parent — sans ceci, Turbopack croit que la racine du projet est là-bas.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
