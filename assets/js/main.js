/* ── Nav: increase opacity on scroll ── */
(function () {
  var nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}());

/* ── Venue signup form ── */
function listVenue(e) {
  e.preventDefault();
  var form = e.target;
  var success = document.getElementById('venue-success');
  if (!success) return;
  form.style.display = 'none';
  success.style.display = 'block';
}
