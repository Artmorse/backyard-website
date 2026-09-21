---
title: "Sections"

# Headless: these pages are text blocks for the home page, not pages of their
# own. home.html reaches for them by path.
#
# `build` covers this file; the `cascade` covers the section files under it —
# without it each one would be rendered as a page of its own at
# /sections/concept/ and Hugo would be looking for a layout for it.
build:
  render: never
  list: never
cascade:
  build:
    render: never
    list: never
---
