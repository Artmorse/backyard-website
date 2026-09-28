/**
 * Génère le Google Form de retours sur la 1re édition de Loop & Bloom (26 septembre 2026).
 *
 * C'est le troisième formulaire du projet : create-registration-form.gs, à
 * côté, inscrit à la course, ../create-mailinglist-form.gs prévient de la
 * suivante, et celui-ci demande à ceux qui l'ont courue ce qu'on doit garder et
 * ce qu'on doit changer. Il vit dans le dossier de l'édition sur laquelle il
 * interroge : la prochaine aura le sien dans son propre dossier.
 *
 * Chaque thème est une page à lui : une note en étoiles pour la tendance, une
 * zone de texte pour le détail. Tout est facultatif sauf la note générale, et
 * rien n'identifie la personne qui répond à moins qu'elle ne laisse son prénom.
 *
 * Utilisation :
 *  1. Va sur https://script.google.com → Nouveau projet
 *  2. Colle tout ce fichier dans l'éditeur
 *  3. Sélectionne la fonction "createFeedbackForm" et clique sur ▶ Exécuter
 *  4. Autorise le script (première exécution uniquement)
 *  5. Le lien du formulaire s'affiche dans le journal d'exécution (Ctrl+Enter / Affichage → Journaux)
 *  6. Ouvre le formulaire et charge assets/img/banner.png en image d'en-tête (🎨) :
 *     Forms en déduit ses couleurs, c'est le seul habillage à faire à la main —
 *     et ce qui donne le même thème qu'aux deux autres formulaires.
 *  7. Colle le lien « à partager » dans le mail de remerciement aux coureurs.
 */
function createFeedbackForm() {
  var form = FormApp.create('Loop & Bloom — Tes retours sur la 1re édition');

  form.setDescription(
    'Merci d\'être venu courir ou encourager avec nous le 26 septembre ! 🌸\n\n' +
    'Loop & Bloom, c\'était une première, et on veut que la deuxième soit encore meilleure. ' +
    'Dis-nous ce qui t\'a plu et ce qu\'on doit changer : ça prend 3 minutes, tout est ' +
    'facultatif sauf la note générale, et c\'est anonyme sauf si tu laisses ton prénom à la fin.\n\n' +
    'Une question ? Écris-nous à loopandbloom.backyard@gmail.com ou contacte-nous sur Instagram : @loopandbloom.backyard'
  );

  form.setCollectEmail(false);        // anonyme : le prénom, en dernière page, est facultatif
  form.setProgressBar(true);          // plusieurs pages : on montre où on en est
  form.setConfirmationMessage(
    'Merci, c\'est précieux ! 🎉 On lit tout, et on s\'en sert pour préparer la prochaine édition. ' +
    'Pour être prévenu de la date, c\'est par ici : https://loopandbloom.backyard.lemomorse.tech'
  );

  // --- Page 1 : ta course -------------------------------------------------------

  // Note générale — la seule question obligatoire, celle qui se compare d'une
  // édition à l'autre.
  addStars(form, 'Ta note générale de la journée')
    .setRequired(true);

  // Le lien circule aussi chez les accompagnants : on sépare leurs réponses de
  // celles des coureurs.
  form.addMultipleChoiceItem()
    .setTitle('Tu étais là pour…')
    .setChoiceValues(['Courir', 'Accompagner ou encourager'])
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('Tu reviendrais à la prochaine édition ?')
    .setChoiceValues(['Oui, sans hésiter', 'Probablement', 'Je ne sais pas encore', 'Non'])
    .setRequired(false);

  // --- Une page par thème : des étoiles, puis le détail ---------------------------

  addTheme(form,
    'Le ravitaillement 🍌',
    'Ce qu\'il y avait à manger et à boire, les quantités, l\'emplacement.',
    'Tu as noté un manque, ou quelque chose à ajouter la prochaine fois ?'
  );

  addTheme(form,
    'L\'organisation générale 🧭',
    'L\'accueil, les horaires, les départs toutes les heures, le camp de base, l\'ambiance.',
    'Qu\'est-ce qui a bien marché, qu\'est-ce qui a coincé ?'
  );

  addTheme(form,
    'Le parcours 🌳',
    'La boucle de 6,7 km au Parc de la Deûle : le terrain, le balisage, le lieu de départ.',
    'Un passage à revoir, un coin à garder absolument ?'
  );

  addTheme(form,
    'La communication 📣',
    'Le site, Instagram, les mails, la révélation du lieu le jeudi avant la course.',
    'Il t\'a manqué une info ? Il y en avait trop ?'
  );

  addTheme(form,
    'Le nombre de participants 👥',
    'Cette année, vous étiez 15 au départ.',
    'Un commentaire sur la taille du groupe ?',
    {
      title: 'La prochaine fois, tu préférerais…',
      values: ['Moins de monde', 'À peu près pareil', 'Un peu plus de monde', 'Beaucoup plus de monde']
    }
  );

  addTheme(form,
    'Le format backyard en 10 boucles 🔁',
    'Une boucle de 6,7 km à boucler dans l\'heure, un départ chaque heure, 10 boucles au maximum.',
    'Le format t\'a plu ? Qu\'est-ce que tu changerais ?',
    {
      title: 'Pour la prochaine édition, tu voudrais…',
      values: [
        'Moins de boucles',
        'Garder 10 boucles',
        'Plus de boucles',
        'Pas de limite : une vraie backyard, jusqu\'au dernier debout'
      ]
    }
  );

  // Les autres formats : la note mesure l'envie, les cases disent lesquels.
  form.addPageBreakItem()
    .setTitle('D\'autres formats Loop & Bloom ? ✨')
    .setHelpText('On a envie d\'organiser autre chose que la backyard. Tu nous suivrais ?');
  addStars(form, 'À quel point tu serais partant pour un autre format ?')
    .setRequired(false);
  form.addCheckboxItem()
    .setTitle('Lesquels te tenteraient ?')
    .setChoiceValues([
      'Le défi David Goggins : 4 miles (6,4 km) toutes les 4 heures pendant 48 h',
      'Un relais en équipe sur 24 h : l\'équipe qui boucle le plus de tours gagne',
      'Une double backyard : la boucle de 6,7 km à pied, puis environ 21 km à vélo',
      'Un trail en ligne, avec plusieurs distances au choix',
      'Une backyard plus longue, de nuit comprise',
      'Une backyard hivernale',
      'Une course en relais'
    ])
    .showOtherOption(true)
    .setRequired(false);
  form.addParagraphTextItem()
    .setTitle('Une idée, un format dont tu rêves ?')
    .setRequired(false);

  // --- Dernière page : le mot de la fin -------------------------------------------

  form.addPageBreakItem()
    .setTitle('Le mot de la fin 🌸');

  form.addParagraphTextItem()
    .setTitle('Ton meilleur souvenir de la journée ?')
    .setHelpText('Avec ton accord, on pourrait en citer quelques-uns sur le site ou sur Instagram.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Autre chose à nous dire ?')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Ton prénom')
    .setHelpText('Facultatif : laisse-le si tu veux qu\'on puisse te répondre, sinon ta réponse reste anonyme.')
    .setRequired(false);

  // Liens utiles dans le journal
  Logger.log('Formulaire (édition)  : %s', form.getEditUrl());
  Logger.log('Formulaire (à partager): %s', form.getPublishedUrl());
}

/**
 * Une note sur 5 étoiles.
 */
function addStars(form, title) {
  return form.addRatingItem()
    .setTitle(title)
    .setRatingScaleLevel(5)
    .setRatingIcon(FormApp.RatingIconType.STAR);
}

/**
 * Un thème du formulaire : une nouvelle page, sa note en étoiles et une zone de
 * texte pour le détail. `choice` ({ title, values }), facultatif, glisse une
 * question à choix unique entre les deux quand le thème appelle une tendance.
 */
function addTheme(form, title, helpText, commentTitle, choice) {
  form.addPageBreakItem()
    .setTitle(title)
    .setHelpText(helpText);
  addStars(form, 'Ta note')
    .setRequired(false);
  if (choice) {
    form.addMultipleChoiceItem()
      .setTitle(choice.title)
      .setChoiceValues(choice.values)
      .setRequired(false);
  }
  form.addParagraphTextItem()
    .setTitle(commentTitle)
    .setRequired(false);
}
