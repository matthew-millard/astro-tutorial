const openMobileMenuButton = document.querySelector('#open-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;
const overlay = document.querySelector('#mobile-menu-overlay') as HTMLDivElement;
const pageContainer = document.querySelector('.page-container') as HTMLDivElement;

function closeMobileMenu() {
  mobileMenu?.classList.remove('expanded');
  pageContainer?.removeAttribute('inert');
  overlay?.setAttribute('aria-hidden', 'true');
  openMobileMenuButton?.focus();
}

function openMobileMenu() {
  mobileMenu?.classList.add('expanded');
  pageContainer?.setAttribute('inert', '');
  overlay?.setAttribute('aria-hidden', 'false');
  closeMobileMenuButton?.focus();
}

openMobileMenuButton.addEventListener('click', openMobileMenu);

closeMobileMenuButton.addEventListener('click', closeMobileMenu);

overlay.addEventListener('click', closeMobileMenu);

mobileMenu.addEventListener('keydown', event => {
  if (event.key == 'Escape') {
    closeMobileMenu();
  }
});
