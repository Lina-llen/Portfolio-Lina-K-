# Suivi des Modifications & Guide Technique — Portfolio Lina Khial

> Ce document consigne l'ensemble des travaux, des choix d'architecture et des optimisations réalisés pour la refonte complète du portfolio de Lina Khial, inspiré de l'esthétique [Plasma UI](https://cruxgarden.github.io/plasma-ui/).

---

## 1. Arborescence du Projet (Bonnes Pratiques)

```text
Portfolio-Lina-K-/
├── css/
│   └── style.css              # Design system (lilas froid, givre, charte restaurée)
├── fonts/
│   └── QurovaDEMO-Regular.otf # Typographie signature
├── images/
│   ├── illustrations/         # 9 illustrations originales (1.png à 9.png)
│   └── projets/               # Dossiers Figma (Horizen, Yoru, Épicurien, The Clean Cup, Data Mind)
├── js/
│   └── script.js              # Curseur fluide, canvas plasma lilas, carrousel 3D, closeCharte, lightbox
├── pages/
│   ├── apropos.html           # Page À Propos (mise en page éditoriale fluide, focus dev web)
│   ├── contact.html           # Page Contact (épurée, sans icônes ni puces)
│   ├── Data_mind.html         # Fiche projet Data Mind (visuels arrondis)
│   ├── Epicurien.html         # Fiche projet Épicurien (logo agrandi)
│   ├── Horizen.html           # Fiche projet Horizen (charte graphique restaurée, maquette immersive)
│   ├── Illustrations.html     # Galerie d'art digital
│   ├── The_clean_cup.html     # Fiche projet The Clean Cup (visuels arrondis)
│   └── Yoru.html              # Fiche projet Yoru (logo sombre grand format)
├── index.html                 # Page d'accueil racine (logos remplissant l'espace média, hero minimal)
└── SUIVI_MODIFICATIONS.md     # Journal de suivi et guide de maintenance
```

---

## 2. Derniers Ajustements Validés

1. **Palette Lilas Froid & Lavande Givrée** :
   - Nuances douces et polaires : lilas clair (`#a78bfa`), lavande givrée (`#c4b5fd`), accent glacé (`#ede9fe`), et lueurs violines subtiles sur fond nuit profond (`#07040f`).
2. **Carrousel : Recentrage Absolu & Cadrage Harmonieux des Visuels** :
   - Recentrage parfait des visuels au cœur du halo radial violet avec padding d'aération équilibré (`padding: 22px 28px` desktop, `14px 18px` mobile) pour éviter que les visuels ne soient écrasés contre les bordures.
   - Compensation micrométrique des décalages intrinsèques des fichiers PNG originaux via `object-position` (Horizen recentré horizontalement à `53.3%`, Épicurien recentré verticalement à `45.9%`).
   - Finition vitrée avec arrondis `border-radius: var(--radius-md)` et drop-shadow soigné sur les logos.
   - Conservation du mode `cover-fill` plein cadre (`object-fit: cover`) pour la 6e carte d'illustration.
3. **Lien GitHub & Logo Officiel Intégrés** :
   - Carte de contact dédiée pour GitHub dans `pages/contact.html` avec logo vectoriel officiel GitHub SVG, lien vers `https://github.com/Lina-llen`, flèche d'ouverture externe et effet de hover lilas lumineux.
   - Intégration discrète et élégante du badge GitHub dans le pied de page (`footer-inner`) sur toutes les pages du site.
4. **Refonte & Perfectionnement Responsive Multi-Écrans** :
   - **Écrans ultra-compacts (<= 400px : iPhone SE, Galaxy A, etc.)** : En-tête capsule adapté sans débordement, carrousel redimensionné (`height: 395px`, `media: 190px`) avec marges ajustées, zéro rognage de texte, grille d'illustrations fluide sur 2 colonnes.
   - **Mobiles standards (<= 640px)** : Espacements adaptés, champs de formulaire calibrés à `16px` minimum (élimination du zoom indésirable iOS Safari), suppression des débordements horizontaux.
   - **Tablettes (<= 960px)** : Transition naturelle des grilles en 1 colonne, ajustement des angles 3D des cartes carrousel latérales.
   - **Gestes tactiles mobile** : Détection intelligente du swipe horizontal (priorité au défilement vertical naturel sans saut accidentel de carte).
5. **Restauration Intégrale de la Charte Graphique Horizen** :
   - Reprise exacte du conteneur `.details-container` et de ses diapositives en fond blanc pur (`.full-width-img-container`).
   - Déroulement fluide au clic sur le bandeau dégradé lilas.
   - Bouton de refermeture interactif (« Refermer la charte graphique » avec `closeCharte()`) qui replie le panneau et replace la vue au sommet.

---

## 3. Accès & Déploiement

- **Serveur local actif** : `http://localhost:3000/`
- **Ouverture directe** : Double-cliquez sur `index.html` pour ouvrir le portfolio dans n'importe quel navigateur (100% autonome, zéro dépendance).
