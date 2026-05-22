/* ── Form: attach submit handler once DOM is ready ── */
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('venue-form');
  if (form) form.addEventListener('submit', listVenue);
});

/* ── Nav: increase opacity on scroll ── */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}());

/* ── Config ── */
var SHEETS_WEBHOOK = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';
var FORMSPREE_URL  = 'PASTE_YOUR_FORMSPREE_URL_HERE';

/* ── Venue signup form ── */
function listVenue(e) {
  e.preventDefault();

  var form    = e.target;
  var btn     = form.querySelector('button[type="submit"]');
  var success = document.getElementById('venue-success');
  var payload = {
    venue: form.venue.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    submitted_at: new Date().toISOString()
  };

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  /* 1 — Google Sheets webhook (no-cors, fire-and-forget) */
  if (SHEETS_WEBHOOK !== 'PASTE_YOUR_APPS_SCRIPT_URL_HERE') {
    fetch(SHEETS_WEBHOOK, {
      method: 'POST',
      mode:   'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(function () {});
  }

  /* 2 — Formspree (email notification) */
  var formspreeReady = FORMSPREE_URL !== 'PASTE_YOUR_FORMSPREE_URL_HERE';
  var done = function () {
    form.style.display   = 'none';
    success.style.display = 'block';
  };

  if (formspreeReady) {
    fetch(FORMSPREE_URL, {
      method:  'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(done)
    .catch(done);
  } else {
    done();
  }
}
