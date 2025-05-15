const toggleMobileMenuButton = document.querySelector('#toggle-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const pageContainer = document.querySelector('#page-container') as HTMLDivElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;

toggleMobileMenuButton?.addEventListener('click', () => {
  const isMenuOpen = mobileMenu.classList.contains('expanded');

  if (isMenuOpen) {
    mobileMenu.classList.remove('expanded');
    pageContainer.removeAttribute('inert');
    toggleMobileMenuButton.focus();
  } else {
    mobileMenu.classList.add('expanded');
    pageContainer.setAttribute('inert', 'true');
    closeMobileMenuButton.focus();
  }
});

closeMobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.remove('expanded');
  pageContainer.removeAttribute('inert');
  toggleMobileMenuButton.focus();
});
