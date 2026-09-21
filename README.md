# Loop & Bloom 🌸

Showcase site for **Loop & Bloom**, a backyard ultra along the canal in the
Hauts-de-France, on **26 September 2026**.

Online at <https://loopandbloom.backyard.lemomorse.tech>

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

Everything a visitor reads lives in `hugo.toml`, `content/` or `data/`. The
templates only arrange it.

### Facts, dates and links — `hugo.toml`

| Block | What it holds |
| --- | --- |
| `[params.event]` | date, schedule, lap distance, place and meeting point, where the evening carries on |
| `[params.route]` | the komoot embed URL and the GPX file behind the "Le parcours" section |
| `[params.registration]` | Google Form URL, button label, price, note |
| `[params.contact]` | email address, Instagram link and handle |
| `[params.analytics]` | Umami switch and website ID |
| `[params.images]` | which file in `assets/img/` serves as banner, logo and favicon |

The countdown target carries its UTC offset
(`startsAt = '2026-09-26T10:00:00+02:00'`), so every visitor sees the same
figures wherever they are rather than counting down to 10h local time.

`[params.route]` holds the one embed on the site that reaches a third party. Its
URL carries a komoot share token — the tour is unlisted, so the token is what
makes the map readable at all. The frame is loaded lazily, so a visitor who
never scrolls to it never calls komoot.

### Section text — `content/sections/*.md`

`concept.md` and `story.md` are headless pages: front matter carries the
`heading` and the accented `closer` line, and the body is plain Markdown.
`{{< brand >}}` in the body — or the `{brand}` token in a heading — renders the
site title in the display face.

### Questions, rules and practical notes — `data/`

| File | Shape |
| --- | --- |
| `data/faq.yaml` | groups of questions; `accent` picks the heading colour (`meadow`, `canal`, `warm`) |
| `data/rules.yaml` | the rules of the game (title + description) |
| `data/practical.yaml` | practical notes (emoji icon + title + body) |

The grids reflow, so adding a fourth rule or a tenth question is a one-line
change with no template to touch.

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
`/gpx/loop-and-bloom-backyard-20260926.gpx`, and `params.route.gpx` is the path
the "Le parcours" section links to, with `download` on the link so the browser
saves the file rather than showing it. The name carries the date of the edition
rather than being `parcours.gpx`: the archive should stay unambiguous once there
is a second loop.

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
content/_index.md        home page front matter
content/sections/        text of the Concept and Histoire sections (headless)
data/                    FAQ, rules, practical notes
layouts/
  baseof.html            shared skeleton
  home.html              the running order of the page, and nothing else
  404.html               not-found page
  _partials/sections/    one partial per section of the page
  _partials/             head, footer, scripts, logo, picture, analytics
  _shortcodes/brand.html the site title in the display face, for Markdown
static/                  fonts, downloads, CNAME
```

`home.html` is the table of contents: it lists the sections in order and
nothing else. Reordering the page means reordering those lines.

---

## JavaScript

`assets/js/main.js` is the only script the project writes. It covers four
things: the countdowns, the daisy that replaces the mouse pointer, revealing
each section as it scrolls into view, and joining the two halves of the contact
address. Everything it needs arrives on data attributes rendered from
`hugo.toml`, and each part is a no-op when its markup is absent — so a section
can be removed from the page without touching the file.

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
card counted down to the reveal. It is published since: `params.event` names the
place and the meeting point, `[params.route]` carries the map and the GPX. A next
edition with a secret to keep should put it back the way it was; the countdown
that did the job is still in `assets/js/main.js`
(`data-countdown-elapsed`).

**The contact address in one piece.** It is written normally in
`[params.contact]`, but the footer splits it on the `@` into two data
attributes and the browser joins them back together — so the built HTML never
carries a complete address for the crawlers that harvest them. Whoever adds a
second contact link should split it the same way rather than writing a plain
`mailto:`.

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
   **edit** link, and the link to **share** (the one to paste into
   `[params.registration] url`).

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

## Contact

📧 loopandbloom.backyard@gmail.com — 📷
[@loopandbloom.backyard](https://instagram.com/loopandbloom.backyard)
