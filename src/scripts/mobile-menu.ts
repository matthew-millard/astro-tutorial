const openMobileMenuButton = document.querySelector('#open-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;
const overlay = document.querySelector('#mobile-menu-overlay') as HTMLDivElement;
const pageContainer = document.querySelector('.page-container') as HTMLDivElement;

// For the prevent scroll and returning to the last scroll position after mobile menu is closed,
// I referred to this blog post by Brad Wu for inspiration: https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/
function closeMobileMenu() {
  const lastScrollPosition = Number(document.body.getAttribute('data-scroll-y'));
  mobileMenu?.classList.remove('expanded');
  pageContainer?.removeAttribute('inert');
  overlay?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('prevent-scroll');
  window.scrollTo(0, lastScrollPosition);
  document.dispatchEvent(new Event('mobileMenuClosed'));
  openMobileMenuButton?.focus();
}

function openMobileMenu() {
  const scrollY = window.scrollY;
  document.body.setAttribute('data-scroll-y', scrollY.toString());
  document.body.classList.add('prevent-scroll');
  mobileMenu?.classList.add('expanded');
  pageContainer?.setAttribute('inert', '');
  overlay?.setAttribute('aria-hidden', 'false');
  closeMobileMenuButton?.focus();
  document.body.scrollTo({ top: scrollY });
}

openMobileMenuButton.addEventListener('click', openMobileMenu);

closeMobileMenuButton.addEventListener('click', closeMobileMenu);

overlay.addEventListener('click', closeMobileMenu);

mobileMenu.addEventListener('keydown', event => {
  if (event.key == 'Escape') {
    closeMobileMenu();
  }
});
