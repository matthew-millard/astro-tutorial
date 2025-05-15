const toggleMobileMenuButton = document.querySelector('#toggle-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;

toggleMobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.toggle('expanded');
});

closeMobileMenuButton?.addEventListener('click', () => {
  mobileMenu.classList.remove('expanded');
});
