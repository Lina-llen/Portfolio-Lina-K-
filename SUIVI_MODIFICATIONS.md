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
2. **Carrousel : Remplissage Intégral de l'Espace Dédié à l'Image** :
   - Suppression des paddings réducteurs de `.card-media`. Les logos s'étendent désormais jusqu'aux bordures de la zone média (290px de haut), avec un effet de drop-shadow soigné.
   - L'illustration du 6e projet remplit 100% de la surface en `cover-fill`.
3. **Restauration Intégrale de la Charte Graphique Horizen** :
   - Reprise exacte du conteneur `.details-container` et de ses diapositives en fond blanc pur (`.full-width-img-container`).
   - Déroulement fluide au clic sur le bandeau dégradé lilas.
   - Bouton de refermeture interactif (« Refermer la charte graphique » avec `closeCharte()`) qui replie le panneau et replace la vue au sommet.

---

## 3. Accès & Déploiement

- **Serveur local actif** : `http://localhost:3000/`
- **Ouverture directe** : Double-cliquez sur `index.html` pour ouvrir le portfolio dans n'importe quel navigateur (100% autonome, zéro dépendance).
