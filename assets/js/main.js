/*
 * The four things the page needs a script for:
 *
 *   1. the countdowns,
 *   2. the daisy that replaces the mouse pointer,
 *   3. revealing each section as it comes into view,
 *   4. joining the two halves of the contact address.
 *
 * No date, no address and no selector-worthy copy is written here: all of it
 * arrives on data attributes, rendered from hugo.toml. Everything below is a
 * no-op when its markup is absent, so a section can be removed from the page
 * without touching this file.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* -------------------------------------------------------------------------
   * 1. Countdowns
   *
   * Markup:
   *   <div data-countdown="2026-09-26T10:00:00+02:00"
   *        data-countdown-elapsed="#selector">      (optional)
   *     <span data-countdown-unit="days">--</span>
   *     …hours, minutes, seconds
   *   </div>
   *
   * The target is parsed with its UTC offset, so the figures are the same
   * wherever the visitor is rather than counting down to 10h local time.
   *
   * Once elapsed: the units are zeroed, and if `data-countdown-elapsed` points
   * at an element, the countdown is hidden and that element takes its place.
   * That is how the "Lieu" card used to swap a countdown for "the location has
   * been emailed" without ever carrying the location; nothing uses it since the
   * reveal, and it is kept for the next edition, which will have a secret of its
   * own to keep.
   * ---------------------------------------------------------------------- */
  var countdowns = [];

  Array.prototype.forEach.call(
    document.querySelectorAll('[data-countdown]'),
    function (el) {
      var target = Date.parse(el.getAttribute('data-countdown'));
      if (isNaN(target)) return;

      countdowns.push({
        el: el,
        target: target,
        elapsed: el.getAttribute('data-countdown-elapsed'),
        units: {
          days: el.querySelector('[data-countdown-unit="days"]'),
          hours: el.querySelector('[data-countdown-unit="hours"]'),
          minutes: el.querySelector('[data-countdown-unit="minutes"]'),
          seconds: el.querySelector('[data-countdown-unit="seconds"]')
        },
        done: false
      });
    }
  );

  function pad(n) {
    return String(n).length < 2 ? '0' + String(n) : String(n);
  }

  function write(units, d, h, m, s) {
    if (units.days) units.days.textContent = pad(d);
    if (units.hours) units.hours.textContent = pad(h);
    if (units.minutes) units.minutes.textContent = pad(m);
    if (units.seconds) units.seconds.textContent = pad(s);
  }

  function tickCountdowns() {
    var now = Date.now();
    var pending = 0;

    countdowns.forEach(function (c) {
      if (c.done) return;

      var left = c.target - now;

      if (left <= 0) {
        c.done = true;
        write(c.units, 0, 0, 0, 0);

        if (c.elapsed) {
          var reveal = document.querySelector(c.elapsed);
          if (reveal) {
            c.el.hidden = true;
            reveal.hidden = false;
          }
        }
        return;
      }

      pending++;
      var seconds = Math.floor(left / 1000);
      write(
        c.units,
        Math.floor(seconds / 86400),
        Math.floor((seconds % 86400) / 3600),
        Math.floor((seconds % 3600) / 60),
        seconds % 60
      );
    });

    return pending;
  }

  if (countdowns.length && tickCountdowns() > 0) {
    var timer = setInterval(function () {
      if (tickCountdowns() === 0) clearInterval(timer);
    }, 1000);
  }

  /* -------------------------------------------------------------------------
   * 2. The daisy cursor
   *
   * Only where there is a pointer to replace. On a touch screen the drawn
   * daisy would sit in the corner of the screen, never moved, while the page
   * had taken the pointer away from anyone plugging in a mouse later.
   * ---------------------------------------------------------------------- */
  var daisy = document.querySelector('.daisy-cursor');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (daisy && finePointer.matches) {
    document.body.classList.add('has-daisy-cursor');

    // The position is written on the next frame rather than on every event:
    // mousemove fires far more often than the screen is redrawn.
    var x = 0;
    var y = 0;
    var queued = false;

    function paintCursor() {
      queued = false;
      daisy.style.transform = 'translate3d(' + (x - 12) + 'px, ' + (y - 12) + 'px, 0)';
    }

    document.addEventListener('mousemove', function (event) {
      x = event.clientX;
      y = event.clientY;
      if (!queued) {
        queued = true;
        window.requestAnimationFrame(paintCursor);
      }
    });
  }

  /* -------------------------------------------------------------------------
   * 3. Revealing the sections
   *
   * The sections are visible in the HTML; `.js` on <html>, set in the head
   * before the first paint, is what hides the ones marked `.reveal` so they
   * can fade in. If this script never runs, nothing is ever hidden.
   * ---------------------------------------------------------------------- */
  var toReveal = document.querySelectorAll('.reveal');

  if (toReveal.length) {
    if (!('IntersectionObserver' in window) || reduceMotion.matches) {
      // No observer, or motion is unwelcome: show everything at once.
      Array.prototype.forEach.call(toReveal, function (el) {
        el.classList.add('is-visible');
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      Array.prototype.forEach.call(toReveal, function (el) {
        observer.observe(el);
      });
    }
  }

  /* -------------------------------------------------------------------------
   * 4. The contact address
   *
   * Joined here from two halves so the page source never carries a complete
   * address for the crawlers that harvest them. The link is inert until this
   * runs, so it is marked `hidden` in the markup and revealed here.
   * ---------------------------------------------------------------------- */
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-email-user][data-email-domain]'),
    function (link) {
      var address =
        link.getAttribute('data-email-user') +
        '@' +
        link.getAttribute('data-email-domain');

      link.href = 'mailto:' + address;

      var label = link.querySelector('[data-email-label]');
      if (label) label.textContent = address;

      link.hidden = false;
    }
  );
})();
