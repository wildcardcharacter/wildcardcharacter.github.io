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
