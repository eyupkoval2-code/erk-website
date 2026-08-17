/* ERK Defense — site behaviour. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  /* ---- mobile navigation ---- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- systems page: highlight the section currently in view ----
     Deliberately geometry-based rather than IntersectionObserver: this runs
     correctly in any rendering state and is trivial to verify. Four
     getBoundingClientRect reads per scroll event is not worth throttling.
  ------------------------------------------------------------------ */
  var subnav = document.querySelector('.subnav');
  if (subnav) {
    var links = [];
    Array.prototype.forEach.call(subnav.querySelectorAll('a[href^="#"]'), function (a) {
      var section = document.getElementById(a.getAttribute('href').slice(1));
      if (section) { links.push({ link: a, section: section }); }
    });

    if (links.length) {
      var syncSubnav = function () {
        // A section counts as current once its top passes under the sticky bars.
        var line = 140;
        var current = null;
        for (var i = 0; i < links.length; i++) {
          if (links[i].section.getBoundingClientRect().top <= line) { current = links[i]; }
        }
        for (var j = 0; j < links.length; j++) {
          links[j].link.classList.toggle('active', links[j] === current);
        }
      };

      window.addEventListener('scroll', syncSubnav, { passive: true });
      window.addEventListener('resize', syncSubnav);
      syncSubnav();
    }
  }

  /* ---- current year in footer ---- */
  var years = document.querySelectorAll('[data-year]');
  for (var i = 0; i < years.length; i++) {
    years[i].textContent = String(new Date().getFullYear());
  }

  /* ---- inquiry form -> pre-composed email -----------------------------
     The site is fully static, so the form composes a mailto: message
     instead of posting to a server. See README.md for how to switch this
     to a hosted form endpoint (Netlify Forms, Formspree, etc.).
  --------------------------------------------------------------------- */
  var form = document.getElementById('inquiry-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var get = function (k) { return (data.get(k) || '').toString().trim(); };

      var subject = 'Procurement inquiry — ' + (get('interest') || 'General') +
                    ' — ' + (get('organisation') || get('name') || 'ERK website');

      var lines = [
        'Name:          ' + get('name'),
        'Organisation:  ' + get('organisation'),
        'Country:       ' + get('country'),
        'Email:         ' + get('email'),
        'Phone:         ' + get('phone'),
        'Interest:      ' + get('interest'),
        'Enquiry type:  ' + get('type'),
        '',
        'Message:',
        get('message'),
        '',
        '— Sent from the ERK Defense website'
      ];

      var href = 'mailto:' + form.dataset.mailto +
                 '?subject=' + encodeURIComponent(subject) +
                 '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = document.getElementById('form-status');
      if (status) {
        status.textContent =
          'Your email client should now open with the inquiry pre-filled. ' +
          'If nothing happens, write to ' + form.dataset.mailto + ' directly.';
      }
    });
  }
})();
