(function () {
  document.documentElement.classList.add('js-enabled');

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (event) {
      if (event.target.tagName === 'A') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  var ids = ['stores', 'sync', 'purchases', 'tracking', 'siri', 'deletion', 'children', 'changes'];
  var links = [].slice.call(document.querySelectorAll('[data-spy] a'));
  var queued = false;
  function syncSections() {
    var mark = window.innerHeight * 0.32;
    var active = ids[0];
    ids.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= mark) active = id;
    });
    links.forEach(function (link) {
      link.classList.toggle('on', link.getAttribute('href') === '#' + active);
    });
  }
  function tick() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () {
      queued = false;
      syncSections();
    });
  }
  window.addEventListener('scroll', tick, { passive: true });
  window.addEventListener('resize', tick);
  syncSections();
  window.setTimeout(syncSections, 300);
}());
