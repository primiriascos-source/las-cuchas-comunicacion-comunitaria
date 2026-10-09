const links = [...document.querySelectorAll('.navlinks a')];
const sections = [...document.querySelectorAll('main section[id]')];
const progress = document.querySelector('#progress-bar');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  if (progress) progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.section-title, .lead, .axis-card, .finding, .evidence, .source, .loop-item, .censorship-viz, blockquote, .viral-compare').forEach(node => {
    node.classList.add('reveal');
    revealObserver.observe(node);
  });
}

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    });
  }, { rootMargin: '-25% 0px -65%' });
  sections.forEach(section => sectionObserver.observe(section));
}

if ('IntersectionObserver' in window && !reduceMotion) {
  const numberObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const number = entry.target;
      const target = Number(number.dataset.count);
      const duration = 900;
      const start = performance.now();
      const frame = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 4;
        number.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
      numberObserver.unobserve(number);
    });
  }, { threshold: 0.7 });
  document.querySelectorAll('[data-count]').forEach(number => numberObserver.observe(number));
}
