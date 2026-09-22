/**
 * Génère le Google Form « être prévenu de la prochaine édition » de Loop & Bloom.
 *
 * C'est le pendant de create-form-20260926.gs : celui-là inscrit à une course
 * qui a une date, celui-ci récolte les adresses de ceux qui veulent en
 * connaître une. Entre deux éditions, c'est le seul formulaire ouvert sur le
 * site.
 *
 * Utilisation :
 *  1. Va sur https://script.google.com → Nouveau projet
 *  2. Colle tout ce fichier dans l'éditeur
 *  3. Sélectionne la fonction "createMailingListForm" et clique sur ▶ Exécuter
 *  4. Autorise le script (première exécution uniquement)
 *  5. Le lien du formulaire s'affiche dans le journal d'exécution (Ctrl+Enter / Affichage → Journaux)
 *  6. Ouvre le formulaire et charge assets/img/banner.png en image d'en-tête (🎨) :
 *     Forms en déduit ses couleurs, c'est le seul habillage à faire à la main —
 *     et ce qui donne le même thème qu'au formulaire d'inscription.
 *  7. Reporte le lien « à partager » dans hugo.toml, sous [params.mailinglist] → url
 */
function createMailingListForm() {
  var form = FormApp.create('Loop & Bloom — Être prévenu de la prochaine édition');

  form.setDescription(
    'Pas de date pour le moment — laisse-nous ton adresse et tu seras prévenu dès qu\'il y en a une. 🌸\n\n' +
    'Un email quand la date de la prochaine édition est fixée, et un autre quand les inscriptions ouvrent. Pas un de plus.\n\n' +
    'On raconte le reste au fil de l\'eau sur Instagram : @loopandbloom.backyard → https://instagram.com/loopandbloom.backyard\n\n' +
    'Une question ? Écris-nous à loopandbloom.backyard@gmail.com ou contacte-nous sur Instagram.'
  );

  form.setCollectEmail(false);        // on collecte l'email via une question dédiée
  form.setProgressBar(false);         // trois questions : une barre de progression n'a rien à mesurer
  form.setConfirmationMessage(
    'C\'est noté, merci ! 🎉 On t\'écrit dès que la prochaine édition a une date. ' +
    'En attendant, on est sur Instagram : @loopandbloom.backyard'
  );

  // 1. Prénom — de quoi écrire un mail à quelqu'un plutôt qu'à une adresse.
  form.addTextItem()
    .setTitle('Prénom')
    .setRequired(true);

  // 2. Adresse mail — tout l'objet du formulaire.
  var email = form.addTextItem();
  email.setTitle('Adresse mail')
    .setRequired(true);
  var emailValidation = FormApp.createTextValidation()
    .setHelpText('Merci de saisir une adresse mail valide.')
    .requireTextIsEmail()
    .build();
  email.setValidation(emailValidation);

  // 3. Consentement (checkbox obligatoire) : la case est ce qui autorise l'envoi,
  //    et elle dit exactement ce à quoi elle engage — le nombre de mails, leur
  //    objet, et comment en sortir.
  var consentement = form.addCheckboxItem();
  consentement.setTitle('Tu es d\'accord pour qu\'on t\'écrive ?')
    .setHelpText(
      'On garde ton prénom et ton adresse uniquement pour t\'annoncer les ' +
      'prochaines éditions de Loop & Bloom. Rien n\'est transmis à personne, et ' +
      'un mot à loopandbloom.backyard@gmail.com suffit pour être retiré de la liste.'
    )
    .setChoiceValues(['Oui, prévenez-moi de la prochaine édition'])
    .setRequired(true);

  // 4. Comment nous as-tu connus ? (facultatif) — de quoi savoir où l'on est lu.
  form.addMultipleChoiceItem()
    .setTitle('Comment nous as-tu connus ?')
    .setChoiceValues(['Instagram', 'Par un ami', 'J\'étais à une édition précédente', 'Au hasard du web'])
    .showOtherOption(true)
    .setRequired(false);

  // 5. Un mot ? (facultatif — servira à alimenter la FAQ, comme sur le formulaire
  //    d'inscription.)
  form.addParagraphTextItem()
    .setTitle('Un mot, une question ?')
    .setHelpText('Dis-nous tout : on s\'en servira pour compléter la FAQ.')
    .setRequired(false);

  // Liens utiles dans le journal
  Logger.log('Formulaire (édition)  : %s', form.getEditUrl());
  Logger.log('Formulaire (à partager): %s', form.getPublishedUrl());
}
