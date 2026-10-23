const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.querySelector('span').textContent = isOpen ? '－' : '＋';
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.querySelector('span').textContent = '＋';
    });
  });
}

document.querySelector('#year').textContent = new Date().getFullYear();


// Schwebenden Nach-oben-Button erst nach etwas Scrollen einblenden.
const backTop = document.querySelector('#back-top');
if (backTop) {
  const updateBackTop = () => {
    backTop.classList.toggle('is-visible', window.scrollY > 320);
  };
  window.addEventListener('scroll', updateBackTop, { passive: true });
  updateBackTop();
}


// Hell-/Dunkelmodus: Auswahl speichern und beim nächsten Besuch wiederherstellen.
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle?.querySelector('.theme-icon');
const themeLabel = themeToggle?.querySelector('.theme-label');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const dark = theme === 'dark';
  if (themeIcon) themeIcon.textContent = dark ? '☀' : '☾';
  if (themeLabel) themeLabel.textContent = dark ? 'Light mode' : 'Dark mode';
  if (themeToggle) {
    const label = dark ? 'Hellmodus aktivieren' : 'Dunkelmodus aktivieren';
    themeToggle.setAttribute('aria-label', label);
    themeToggle.title = label;
  }
  if (themeMeta) themeMeta.setAttribute('content', dark ? '#171916' : '#171916');
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('mkreichelt-theme'); } catch (_) {}
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    try { localStorage.setItem('mkreichelt-theme', nextTheme); } catch (_) {}
  });
}
