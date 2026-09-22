---
# -----------------------------------------------------------------------------
# The archive — one page per edition, at /editions/<date>/.
#
# Each edition is a page bundle that carries everything about itself:
#
#   content/editions/2026-09-26/
#     index.md          the facts: date, place, loop, and `archived` /
#                       `participants` once the race has been run
#     concept.md        the "Le concept" passage
#     story.md          the "L'aventure" passage
#     rules.yaml        the rules of the game
#     practical.yaml    the practical notes
#     faq.yaml          the questions, grouped
#
# Adding an edition is copying that directory, changing the date in its name and
# rewriting the six files. Nothing else in the project has to be touched: the
# home page picks up any edition that is not `archived` and announces it, and
# this page lists the ones that are.
#
# An edition still to come also carries a `registration` block:
#
#   registration:
#     url: "https://docs.google.com/forms/d/e/…/viewform"
#     closed: false
#     closedAt: 2026-09-26T10:00:00+02:00
#     label: "S'inscrire maintenant"
#     closedLabel: "Inscriptions terminées"
#     price: "10€"
#     note: "Places limitées • 10€ par personne • Inscription via le formulaire"
#     closedNote: "Les inscriptions sont terminées depuis le 26 septembre 2026 à 10h, l'heure du premier départ"
#
# That block decides which of its three states the buttons take. An empty `url`
# reads as "the form does not exist yet": the buttons become a discreet
# "Inscriptions à venir" note rather than a dead link, which is what the page
# should read like between the announcement and the day the form exists. With a
# `url` and `closed: true` the registrations are over: the button is greyed out
# and no longer a link at all, so the form that stopped accepting anyone cannot
# be reached from here, and the banner thanks rather than asks. Anything else is
# the live state.
#
# `closed` is a switch thrown by hand, like `archived`: the site is only rebuilt
# when something is pushed, so a template comparing the closing moment against
# the build date would never fire on the day. `closedAt` records when it is due —
# the first start — and `closed: false` re-opens everything.
# -----------------------------------------------------------------------------
title: "Anciennes courses"
description: "Toutes les éditions de Loop & Bloom, la course nature entre amis au bord du canal dans les Hauts-de-France. Chaque édition garde sa page : la trace GPX, les infos pratiques et la FAQ de la journée."
---

Chaque édition garde sa page, telle qu'elle était le jour de la course : la
carte et la trace GPX, les infos pratiques, les règles du jeu et la FAQ.
