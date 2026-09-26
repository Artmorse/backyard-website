---
# -----------------------------------------------------------------------------
# The first edition — 26 September 2026.
#
# This file is the single source of truth for this race: its date, its place,
# its loop, its price. Nothing about it is written into hugo.toml or into a
# template any more, which is what makes the page an archive — it will still
# read the way it read on the day once a second edition exists with a different
# date, a different loop and a different price.
#
# The rest of the edition sits beside this file, in the same bundle:
#
#   concept.md  story.md   the two passages of prose
#   rules.yaml             the rules of the game
#   practical.yaml         the practical notes
#   faq.yaml               the questions
#
# `build.publishResources: false` keeps those three YAML files out of public/: they
# are read at build time and rendered into the page, and there is no reason to
# serve a second, raw copy of them.
# -----------------------------------------------------------------------------
title: "1re édition"
description: "La première édition de Loop & Bloom, le 26 septembre 2026 au Parc de la Deûle : 15 coureurs, des tours de 6,7 km de 10h à 20h. La trace GPX, les infos pratiques et la FAQ de la journée."

# The first start, with its UTC offset. This is the countdown target while the
# edition is still to come, and the date the archive is sorted on afterwards —
# written once, here, rather than in a `startsAt` of its own.
date: 2026-09-26T10:00:00+02:00

# `archived` is what moves this edition from the home page to /editions/, and it
# is set by hand rather than derived from the date: the entry in the archive
# carries the number of runners who actually turned up, so an edition only
# crosses over once somebody has that figure. Nothing flips on its own halfway
# through the race day.
archived: true
participants: 15

build:
  publishResources: false

event:
  # The date, in the two written forms the pages need. French month names, so
  # they are spelled out rather than formatted from `date` above.
  dateShort: "26 septembre 2026"
  dateLong: "Samedi 26 Septembre 2026"

  welcomeFrom: "9h"
  firstStart: "10h"
  lastCall: "20h"
  scheduleNote: "Accueil dès 9h • Premier départ à 10h"

  lapDistance: "6,7 km"
  lapNote: "Un départ chaque heure"

  # Where.
  #
  # The place was kept out of this project until the reveal — announced on the
  # site for jeudi 24 septembre à 8h, and emailed to the registered runners on
  # the day. It is published here since; `startMap` points at the meeting point
  # itself, the car park the runners were expected at.
  area: "Parc de la Deûle"
  areaNote: "Houplin-Ancoisne, à 15 minutes de Lille en voiture"
  locationRevealLong: "jeudi 24 septembre à 8h"
  startMap: "https://maps.app.goo.gl/tkK97dhs36iVANfY9"

# -----------------------------------------------------------------------------
# The route.
#
# `komootEmbed` is the share URL of the komoot tour, and the iframe it feeds is
# the only frame on the site that reaches a third party — everything else, the
# fonts included, is served from this domain. It carries a share token: the tour
# is unlisted, so the token is what makes the map readable at all, and replacing
# the tour means replacing the whole URL.
#
# `gpx` is a path under static/, served exactly as it was exported. The file is
# dated rather than named `parcours.gpx`: this first edition should still be
# unambiguous in the archive once a second one exists.
# -----------------------------------------------------------------------------
route:
  komootEmbed: "https://www.komoot.com/tour/3298172426/embed?share_token=amNhHU0XjOh1U0q1FnuNYw4ViPBGEQvYBXrpMO72a3BLslQosw&hl=fr&layout=classic&profile=1"
  gpx: "gpx/loop-and-bloom-backyard-20260926.gpx"
  gpxNote: "Trace komoot, 6,7 km par tour"

# No `registration` block: this edition has been run, and an archived page has
# nothing to register for. An edition still to come carries one — see the note
# in content/editions/_index.md for its shape — and the page then closes on the
# registration banner rather than on the "rester dans la boucle" one.
---

<!--
  This page has no body of its own: it is assembled from concept.md, story.md
  and the three YAML files beside it, in the order set by
  layouts/editions/single.html.
-->
