/* One Love Golf Cart Rentals - homepage behaviour.
   Three jobs: the mobile menu, detaching the floating nav pill on scroll, and
   the scroll reveal. All observer-based; there is no scroll event listener on
   the page, and every motion path is gated on prefers-reduced-motion. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- mobile menu ------------------------------------------------------ */
  var burger = document.getElementById('burger');
  var links = document.getElementById('navLinks');

  if (burger && links) {
    var close = function () {
      burger.setAttribute('aria-expanded', 'false');
      links.classList.remove('is-open');
    };
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('is-open', !open);
    });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    window.matchMedia('(min-width: 1080px)').addEventListener('change', close);
  }

  /* ---- detach the nav pill ---------------------------------------------
     The pill starts inside the hero panel. Once the page scrolls past a
     sentinel at the top it switches to fixed, so it rides along without ever
     changing size or colour. Communicates state; no decorative purpose.    */
  var navwrap = document.getElementById('navwrap');
  if (navwrap && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:90px;pointer-events:none';
    document.body.prepend(sentinel);

    new IntersectionObserver(function (entries) {
      navwrap.classList.toggle('is-stuck', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(sentinel);
  }

  /* ---- scroll reveal ---------------------------------------------------- */
  var targets = document.querySelectorAll('[data-reveal]');

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  targets.forEach(function (el) { io.observe(el); });
})();
