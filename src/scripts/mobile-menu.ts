const openMobileMenuButton = document.querySelector('#open-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;
const overlay = document.querySelector('#mobile-menu-overlay') as HTMLDivElement;
const pageContainer = document.querySelector('#page-container') as HTMLDivElement;

openMobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.add('expanded');
  pageContainer.setAttribute('inert', '');
  overlay.setAttribute('aria-hidden', 'false');
  closeMobileMenuButton.focus();
});

closeMobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.remove('expanded');
  pageContainer.removeAttribute('inert');
  overlay.setAttribute('aria-hidden', 'true');
  openMobileMenuButton.focus();
});
