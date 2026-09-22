# Loop & Bloom 🌸

Showcase site for **Loop & Bloom**, a backyard ultra along the canal in the
Hauts-de-France. The first edition was run on **26 September 2026**.

Online at <https://loopandbloom.backyard.lemomorse.tech>

The site holds one self-contained page per edition. The home page announces the
next one — or says plainly that there is no date yet — and `/editions/` keeps the
ones already run exactly as they were on the day: the same map, the same GPX, the
same practical notes and the same FAQ.

> The code, comments and documentation are in English. Everything the visitors
> read — page content, labels, dates — stays in French.

---

## Running it locally

Tool versions are pinned in `.tool-versions` (asdf):

```sh
asdf install          # Hugo 0.164.0 + Node.js 22.16.0
npm ci                # Tailwind CSS dependencies
hugo server           # http://localhost:1313
```

`npm start` and `npm run build` wrap `hugo server` and
`hugo build --gc --minify` if you prefer npm scripts.

Hugo builds the stylesheet itself through `css.TailwindCSS`, so there is no
separate Tailwind watcher to run alongside the server.

---

## Editing the site without touching a template

Everything a visitor reads lives in `hugo.toml` or `content/`. The templates only
arrange it.

### One edition, one page bundle — `content/editions/`

An edition is a folder, and everything that belongs to that race is inside it:

```
content/editions/2026-09-26/
  index.md          the edition itself: date, place, loop, route, price
  concept.md        the first passage of prose
  story.md          the second
  rules.yaml        the rules of the game
  practical.yaml    the practical notes
  faq.yaml          the questions
```

That is what makes an archive an archive: the 2026 page keeps its own date, its
own loop, its own price and its own FAQ once a second edition exists with
different ones. Nothing about a race is written into `hugo.toml` or into a
template any more.

`index.md` carries the front matter:

| Key | What it holds |
| --- | --- |
| `title` | how the edition is named in the menu and the archive (`1re édition`) |
| `date` | the **first start**, with its UTC offset — the countdown target, and the key the archive is sorted on |
| `archived` | `true` moves the edition from the home page to the archive |
| `participants` | how many runners took the start, shown in the archive |
| `event` | the two written date forms, the schedule, the lap, the place and the meeting point |
| `route` | the komoot embed URL and the GPX file behind the "Le parcours" section |
| `registration` | Google Form URL, button labels, price, notes, and the switch that closes the registrations — **only** on an edition still to come |

`date` carries its UTC offset (`2026-09-26T10:00:00+02:00`), so every visitor
sees the same countdown wherever they are rather than counting down to 10h local
time. An edition still ahead is therefore a page dated in the future, which Hugo
would leave out of the build — hence `buildFuture = true` in `hugo.toml`.

`archived` is set **by hand** rather than derived from the date. The archive entry
carries the number of runners who actually turned up, so an edition only crosses
over once somebody has that figure — and nothing flips on its own halfway through
the race day.

`route` holds the one embed on the site that reaches a third party. Its URL
carries a komoot share token — the tour is unlisted, so the token is what makes
the map readable at all. The frame is loaded lazily, so a visitor who never
scrolls to it never calls komoot.

`registration.closed` ends the registrations of an edition still to come. Set to
`true`, both its buttons become a greyed-out "Inscriptions terminées" that is no
longer a link, and the closing section thanks the runners instead of inviting
them. Like `archived`, it is thrown by hand: the site is only rebuilt on a push,
so a template comparing `closedAt` — the first start — against the build date
would never fire on the day. Setting it back to `false` re-opens everything.

**Adding an edition**: copy the folder, drop `participants`, set
`archived: false`, give it a `registration` block, and correct the dates, the loop
and the place. The home page picks it up on its own — it announces the earliest
edition that is not archived, and lists the rest. `content/editions/_index.md`
holds the same note, next to the content.

#### Prose — `concept.md` and `story.md`

Two `.md` files inside the bundle, read as page resources rather than as pages of
their own: front matter carries the `heading` and the accented `closer` line, and
the body is plain Markdown. `{{< brand >}}` in the body — or the `{brand}` token
in a heading — renders the site title in the display face.

The home page uses the same mechanism for its own concept text, straight out of
`content/_index.md` (`heading`, `closer`, and the body).

#### Questions, rules and practical notes — the bundle's YAML

| File | Shape |
| --- | --- |
| `faq.yaml` | groups of questions; `accent` picks the heading colour (`meadow`, `canal`, `warm`) |
| `rules.yaml` | the rules of the game (title + description) |
| `practical.yaml` | practical notes (emoji icon + title + body) |

The grids reflow, so adding a fourth rule or a tenth question is a one-line
change with no template to touch. `build.publishResources: false` in `index.md`
keeps the three files out of `public/`: they are read at build time, and there is
no reason to serve a raw second copy of them.

### What does not change from one edition to the next — `hugo.toml`

| Block | What it holds |
| --- | --- |
| `[menus]` | the two entries of the navigation: "Prochaine course" (`/`) and "Anciennes courses" (`/editions`) |
| `[params]` | the description, the tagline and the region |
| `[params.mailinglist]` | Google Form URL, button label and note for "être prévenu de la prochaine édition" |
| `[params.contact]` | email address, Instagram link and handle |
| `[params.analytics]` | Umami switch and website ID |
| `[params.images]` | which file in `assets/img/` serves as banner, logo and favicon |

The menu labels are the visitor's words, not the section's: the content lives
under `content/editions/`, which is what the URLs say, but nobody is made to read
"éditions" in the menu.

An empty `[params.mailinglist] url` turns the button into a discreet "bientôt"
note rather than a dead link, the same way registration does — so the page can
ship before the form exists.

### Audience measurement — `hugo.toml`, `[params.analytics]` section

Umami Cloud counts page views. `enable = false` switches measurement off while
keeping the identifier on file. The tracker only ever ships with the deployed
site: `hugo server` sends nothing, so working locally leaves the figures
untouched.

The tracker is loaded straight from `cloud.umami.is`. Ad blockers therefore
undercount, which is accepted.

### Palette and typography — `assets/css/main.css`

The only hexadecimal values in the project sit in the `:root` block. The
`@theme` block maps those raw colours to semantic roles, which Tailwind then
exposes as utilities (`text-forest`, `bg-beige`). Tailwind's own palette is
dropped, so a stray `text-sky-500` produces nothing and fails loudly rather
than quietly working.

Playfair Display and Inter are self-hosted from `static/fonts/` as variable
woff2 files, split by `unicode-range` into latin and latin-ext.

### Downloads — `static/gpx/` and `static/docs/`

Files dropped there are served as they are:
`static/gpx/loop-and-bloom-backyard-20260926.gpx` is reachable at
`/gpx/loop-and-bloom-backyard-20260926.gpx`, and the edition's `route.gpx` is the
path the "Le parcours" section links to, with `download` on the link so the
browser saves the file rather than showing it. The name carries the date of the
edition rather than being `parcours.gpx`: the archive should stay unambiguous once
there is a second loop.

### Images — `assets/img/`

The source files are used as they are: Hugo resizes them at build time and
serves AVIF with WebP and JPEG fallbacks. The banner reaches a phone as roughly
37 KB rather than the 1.3 MB original.

---

## Structure

```
assets/css/main.css      visual identity and styles
assets/js/main.js        countdowns, daisy cursor, scroll reveal, email assembly
assets/img/              source images (banner, logo, icon)
content/_index.md        home page: front matter and the concept text
content/editions/
  _index.md              the archive page and its note on adding an edition
  2026-09-26/            one edition, whole: front matter, prose, YAML
layouts/
  baseof.html            shared skeleton
  home.html              the running order of the home page, and nothing else
  editions/single.html   the running order of an edition
  editions/list.html     the archive: one link per edition
  404.html               not-found page
  _partials/sections/    one partial per section of a page
  _partials/nav.html     the two-entry menu bar
  _partials/func/        partials that return a value rather than markup
  _partials/             head, footer, scripts, logo, picture, cta, edition card
  _shortcodes/brand.html the site title in the display face, for Markdown
static/                  fonts, downloads, CNAME
```

`home.html` and `editions/single.html` are tables of contents: they list the
sections in order and nothing else. Reordering a page means reordering those
lines.

`_partials/func/` holds the partials that return a value instead of markup:
`editions.html` splits the editions into `upcoming` and `past`, `data.html` reads
one of a bundle's YAML files, and `brand.html` and `analytics.html` answer
questions about the site title and about measurement.

---

## JavaScript

`assets/js/main.js` is the only script the project writes. It covers five
things: the countdowns, the daisy that replaces the mouse pointer, dropping the
menu bar in once the banner has moved, revealing each section as it scrolls into
view, and joining the two halves of the contact address. Everything it needs
arrives on data attributes — the countdown target from the edition's own front
matter, the address from `hugo.toml` — and each part is a no-op when its markup is
absent, so a section can be removed from a page without touching the file.

Nothing depends on the script running. Without it every section is simply
visible, and the menu bar is there from the start instead of dropping in: the
`.js` class the head sets before the first paint is what enables the hiding in
the first place.

The daisy cursor only appears where there is a pointer to replace
(`hover: hover` and `pointer: fine`), and every animation stands down under
`prefers-reduced-motion: reduce`.

---

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site to GitHub Pages on
every push to `main`. No manual step is needed.

The repository's **Settings → Pages → Source** must be set to **GitHub
Actions** — the site is no longer served from a branch.

The custom domain is declared in `static/CNAME`. It must match `baseURL` in
`hugo.toml`.

---

## What must stay out of the repository

**The exact location, until it is revealed.** For the 2026 edition it was
emailed to the registered runners on **jeudi 24 septembre à 8h**, as the site had
announced, and until that morning it appeared in neither the templates, nor the
data files, nor the built HTML — only the wider area was public, and the "Lieu"
card counted down to the reveal. It is published since: the edition's `event`
names the place and the meeting point, and its `route` carries the map and the
GPX. A next edition with a secret to keep should put it back the way it was; the
countdown that did the job is still in `assets/js/main.js`
(`data-countdown-elapsed`).

**The contact address in one piece.** It is written normally in
`[params.contact]`, but the footer splits it on the `@` into two data
attributes and the browser joins them back together — so the built HTML never
carries a complete address for the crawlers that harvest them. Whoever adds a
second contact link should split it the same way rather than writing a plain
`mailto:`.

---

## The two Google Forms

The site never hosts a form of its own: it links out to a Google Form, and each
one is generated by an Apps Script kept in this repository rather than built by
hand.

| Script | Form | Where its URL goes |
| --- | --- | --- |
| `create-form.gs` | registering for an edition that has a date | the edition's `registration.url` |
| `create-mailinglist-form.gs` | being told when the next edition has one | `[params.mailinglist] url` in `hugo.toml` |

Between two races only the second one is open — which is the whole point of it.

---

## Creating the registration form (Google Form)

The form is generated by the `create-form.gs` script through Google Apps
Script. There is no need to build it by hand.

### Steps

1. Go to [script.google.com](https://script.google.com) → **New project**.
2. Copy the whole content of [`create-form.gs`](./create-form.gs) into the
   editor.
3. Select the `createInscriptionForm` function in the toolbar, then click
   **▶ Run**.
4. On the first run Google asks for an **authorisation**: accept it (the script
   needs to create a form on your account).
5. Open the **execution log** (`Ctrl` + `Enter`): it prints two links — the
   **edit** link, and the link to **share** (the one to paste into the edition's
   `registration.url`, in `content/editions/<date>/index.md`).

### What the script generates

- **Title**: *Loop & Bloom — Inscription à la course*
- **Description**: an invitation to follow
  [`@loopandbloom.backyard`](https://instagram.com/loopandbloom.backyard) on
  Instagram, plus the contact email.
- **Questions**:
  1. Liability waiver — **required** checkbox
  2. Surname — **required**
  3. First name — **required**
  4. Email address — **required**, validated as an email
  5. Phone — **required**
  6. Post-race meal — *Resto / Pique-nique / Bar* — **required**
  7. Any questions? — optional free field (feeds the site's FAQ)

### Changing the form

Either edit the script and run it again, which creates a **new** form and
leaves the old one untouched, or edit the generated form directly through its
edit link for small adjustments.

The Instagram link and the question wording are in plain sight in
`create-form.gs`.

### Registration cap

The form is **capped at 20 responses**: once that number is reached it stops
accepting new registrations. The cap is set **by hand** in the Google form —
Google Forms has no native setting for a total response limit.

---

## Creating the mailing-list form (Google Form)

Same procedure, with [`create-mailinglist-form.gs`](./create-mailinglist-form.gs)
and the `createMailingListForm` function. The share link goes into
`[params.mailinglist] url` in `hugo.toml`; while it is empty the button on the
site is a "Bientôt disponible" note rather than a dead link.

### What the script generates

- **Title**: *Loop & Bloom — Être prévenu de la prochaine édition*
- **Description**: there is no date yet, one email when there is, and the
  Instagram handle and contact address for everything else.
- **Questions**:
  1. First name — **required**
  2. Email address — **required**, validated as an email
  3. Consent — **required** checkbox, saying what the address is kept for and how
     to be taken off the list
  4. How did you hear about us? — optional, with a free "other"
  5. A word, a question? — optional free field (feeds the site's FAQ)

The list is short on purpose: an address, a first name so the email can be
addressed to somebody, and the agreement to receive it.

### Sending the announcement

There is no sending machinery, and none is planned: the responses are a
spreadsheet, and the email that announces an edition is written by hand. Whoever
sends it should put the addresses in **Cci** — a visible recipient list would hand
every subscriber's address to all the others.

---

## Contact

📧 loopandbloom.backyard@gmail.com — 📷
[@loopandbloom.backyard](https://instagram.com/loopandbloom.backyard)
