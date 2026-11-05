
(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add(reduce ? 'reduce-motion' : 'motion-ok');

  // Staggered scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reduce) {
    reveals.forEach(el => el.classList.add('in'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  // Shine sweep on CTA tap/click
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('.shine');
    if (!btn || reduce) return;
    btn.classList.remove('shine-run');
    void btn.offsetWidth;
    btn.classList.add('shine-run');
  }, { passive: true });
})();
