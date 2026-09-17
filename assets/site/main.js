'use strict';
// All content is static HTML. JavaScript progressively adds filters and navigation.
const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 720px)');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  menu.querySelector('span').textContent = open ? '−' : '＋';
  navigation.dataset.collapsed = String(mobile.matches && !open);
}
menu.hidden = false;
setMenu(false);
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
mobile.addEventListener('change', () => setMenu(false));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menu.focus();
  }
});
const filterButtons = [...document.querySelectorAll('[data-filter]')];
const publications = [...document.querySelectorAll('.publication')];
const search = document.querySelector('#publication-search');
let activeFilter = 'all';
function filterPublications() {
  const terms = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  let count = 0;
  publications.forEach(paper => {
    const matchesTopic = activeFilter === 'all' || paper.dataset.topics.split(' ').includes(activeFilter);
    const text = paper.textContent.toLowerCase();
    const matchesSearch = terms.every(term => text.includes(term));
    paper.hidden = !(matchesTopic && matchesSearch);
    if (!paper.hidden) count++;
  });
  document.querySelector('.publication-count').textContent = `${count} of ${publications.length} publications & preprints · * equal contribution`;
  document.querySelector('#no-results').hidden = count !== 0;
}
document.querySelector('.publication-tools').hidden = false;
filterButtons.forEach(button => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  filterPublications();
}));
search.addEventListener('input', filterPublications);
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin: '-10% 0px -65% 0px', threshold: 0});
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
