# Loop & Bloom 🌸

Site vitrine de **Loop & Bloom**, une course nature dans les Hauts-de-France (le **26 septembre 2026**).

Le site présente le concept, le parcours, les infos pratiques et une FAQ, avec un compte à rebours jusqu'au jour J. Il invite les visiteurs à s'inscrire via un Google Form.

## Structure du projet

| Fichier | Rôle |
| --- | --- |
| `index.html` | Le site complet (une seule page, HTML + [Tailwind CSS](https://tailwindcss.com) via CDN, police *Playfair Display*). |
| `banner.png`, `logo.png`, `icon.png` | Visuels du site. |
| `CNAME` | Domaine personnalisé GitHub Pages : `backyard.lemorse.tech`. |
| `create-form.gs` | Script Google Apps Script qui génère le formulaire d'inscription (voir ci-dessous). |
| `DESIGN_PROMPT.md` | Notes de design. |

## Hébergement

Le site est une page statique servie via **GitHub Pages** sur le domaine `backyard.lemorse.tech` (configuré par le fichier `CNAME`). Tout push sur la branche `main` met le site à jour.

## Développement local

Aucune dépendance à installer (Tailwind est chargé par CDN). Il suffit d'ouvrir `index.html` dans un navigateur, ou de servir le dossier :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Créer le formulaire d'inscription (Google Form)

Le formulaire est généré automatiquement par le script `create-form.gs` grâce à Google Apps Script. Pas besoin de le construire à la main.

### Étapes

1. Va sur [script.google.com](https://script.google.com) → **Nouveau projet**.
2. Copie tout le contenu de [`create-form.gs`](./create-form.gs) dans l'éditeur.
3. Sélectionne la fonction `createInscriptionForm` dans la barre d'outils, puis clique sur **▶ Exécuter**.
4. À la première exécution, Google demande une **autorisation** : accepte-la (le script a besoin de créer un formulaire sur ton compte).
5. Ouvre le **journal d'exécution** (`Ctrl` + `Entrée`) : il affiche deux liens
   - le lien d'**édition** (pour modifier le formulaire),
   - le lien à **partager** (à mettre sur le site / à diffuser).

### Ce que génère le script

- **Titre** : *Loop & Bloom — Inscription à la course*
- **Description** : invitation à suivre [`@loopandbloom.backyard`](https://instagram.com/loopandbloom.backyard) sur Instagram + email de contact.
- **Questions** :
  1. Décharge de responsabilité — case à cocher **obligatoire**
  2. Nom — **obligatoire**
  3. Prénom — **obligatoire**
  4. Adresse mail — **obligatoire**, validée comme email
  5. Téléphone — **obligatoire**
  6. Repas de fin de course — *Resto / Pique-nique / Bar* — **obligatoire**
  7. Une question ? — champ libre facultatif (sert à alimenter la FAQ du site)

### Modifier le formulaire

Deux options :

- **Éditer le script** puis le ré-exécuter : cela crée un **nouveau** formulaire (l'ancien n'est pas modifié). Pratique pour repartir de zéro.
- **Éditer directement** le formulaire généré via son lien d'édition, pour de petits ajustements.

Le lien Instagram et les intitulés des questions se trouvent en clair dans `create-form.gs`.

## Contact

📧 loopandbloom.backyard@gmail.com — 📷 [@loopandbloom.backyard](https://instagram.com/loopandbloom.backyard)
