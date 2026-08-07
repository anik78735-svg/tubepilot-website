// TubePilot site — shared behaviour: mobile nav, scrollspy for legal pages,
// back-to-top button, auto-updating footer year, and FAQ accordion.
document.addEventListener('DOMContentLoaded', function () {
  // ---- Mobile nav toggle ----
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Footer year ----
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Back to top ----
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    window.addEventListener('scroll', function () {
      toTop.classList.toggle('visible', window.scrollY > 480);
    }, { passive: true });
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- FAQ Accordion ----
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        // Close all others (optional — remove this loop for multi-open)
        faqItems.forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            var otherQ = otherItem.querySelector('.faq-question');
            if (otherQ) otherQ.setAttribute('aria-expanded', 'false');
          }
        });
        // Toggle current
        item.classList.toggle('open', !isOpen);
        question.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      });
    }
  });

  // ---- Scrollspy for legal-page table of contents ----
  var tocLinks = document.querySelectorAll('.toc a');
  if (tocLinks.length) {
    var sections = Array.prototype.map.call(tocLinks, function (a) {
      return document.querySelector(a.getAttribute('href'));
    }).filter(Boolean);

    var setActive = function (id) {
      tocLinks.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + id);
      });
    };

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
      sections.forEach(function (s) { observer.observe(s); });
    }
  }
});
