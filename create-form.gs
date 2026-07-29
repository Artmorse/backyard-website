/**
 * Génère le Google Form d'inscription à la course "Loop & Bloom".
 *
 * Utilisation :
 *  1. Va sur https://script.google.com → Nouveau projet
 *  2. Colle tout ce fichier dans l'éditeur
 *  3. Sélectionne la fonction "createInscriptionForm" et clique sur ▶ Exécuter
 *  4. Autorise le script (première exécution uniquement)
 *  5. Le lien du formulaire s'affiche dans le journal d'exécution (Ctrl+Enter / Affichage → Journaux)
 */
function createInscriptionForm() {
  var form = FormApp.create('Loop & Bloom — Inscription à la course');

  form.setDescription(
    'Inscris-toi à la course Loop & Bloom ! 🌸\n\n' +
    'Pour ne rien manquer (news, horaires, dernières infos), suis-nous sur Instagram : @loopandbloom.backyard → https://instagram.com/loopandbloom.backyard\n\n' +
    'Un doute ? Écris-nous à loopandbloom.backyard@gmail.com ou contacte nous sur Instagram.'
  );

  form.setCollectEmail(false);        // on collecte l'email via une question dédiée
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Merci pour ton inscription ! 🎉 On te tient au courant. ' +
    'Pense à nous suivre sur Instagram @loopandbloom.backyard pour les dernières news.'
  );

  // 1. Décharge de responsabilité (checkbox obligatoire)
  var decharge = form.addCheckboxItem();
  decharge.setTitle('Décharge de responsabilité')
    .setHelpText(
      'Je participe à la course sous ma propre responsabilité et dégage les ' +
      'organisateurs de toute responsabilité en cas d\'accident ou de blessure.'
    )
    .setChoiceValues(['J\'accepte et je décharge les organisateurs de toute responsabilité'])
    .setRequired(true);

  // 2. Nom
  form.addTextItem()
    .setTitle('Nom')
    .setRequired(true);

  // 3. Prénom
  form.addTextItem()
    .setTitle('Prénom')
    .setRequired(true);

  // 4. Adresse mail
  var email = form.addTextItem();
  email.setTitle('Adresse mail')
    .setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .setHelpText('Merci de saisir une adresse mail valide.')
    .requireTextIsEmail()
    .build();
  email.setValidation(emailValidation);

  // 5. Téléphone
  form.addTextItem()
    .setTitle('Téléphone')
    .setRequired(true);

  // 6. Repas de fin de course
  form.addMultipleChoiceItem()
    .setTitle('Repas à la fin de la course')
    .setHelpText('Que préfères-tu pour l\'après-course ?')
    .setChoiceValues(['Resto', 'Pique-nique', 'Bar'])
    .setRequired(true);

  // 7. Questions (facultatif — servira à alimenter la FAQ)
  form.addParagraphTextItem()
    .setTitle('Une question ?')
    .setHelpText('Pose ta question ici : on s\'en servira pour compléter la FAQ.')
    .setRequired(false);

  // Liens utiles dans le journal
  Logger.log('Formulaire (édition)  : %s', form.getEditUrl());
  Logger.log('Formulaire (à partager): %s', form.getPublishedUrl());
}
