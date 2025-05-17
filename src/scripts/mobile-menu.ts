const openMobileMenuButton = document.querySelector('#open-mobile-menu-button') as HTMLButtonElement;
const closeMobileMenuButton = document.querySelector('#close-mobile-menu-button') as HTMLButtonElement;
const mobileMenu = document.querySelector('#mobile-menu') as HTMLDivElement;
const overlay = document.querySelector('#mobile-menu-overlay') as HTMLDivElement;
const pageContainer = document.querySelector('.page-container') as HTMLDivElement;

function closeMobileMenu() {
  mobileMenu?.classList.remove('expanded');
  pageContainer?.removeAttribute('inert');
  pageContainer?.classList.remove('prevent-scroll');
  overlay?.setAttribute('aria-hidden', 'true');
  openMobileMenuButton?.focus();
  // When the modal is hidden...
  // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/#aa-lets-enhance-the-fixed-body-approach
  const scrollY = document.body.style.top;
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1);
}

function openMobileMenu() {
  mobileMenu?.classList.add('expanded');
  pageContainer?.setAttribute('inert', '');
  pageContainer?.classList.add('prevent-scroll');
  overlay?.setAttribute('aria-hidden', 'false');
  closeMobileMenuButton?.focus();
  // When the modal is shown, we want a fixed body
  // https://css-tricks.com/prevent-page-scrolling-when-a-modal-is-open/#aa-lets-enhance-the-fixed-body-approach
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
}

openMobileMenuButton.addEventListener('click', openMobileMenu);

closeMobileMenuButton.addEventListener('click', closeMobileMenu);

overlay.addEventListener('click', closeMobileMenu);

mobileMenu.addEventListener('keydown', event => {
  if (event.key == 'Escape') {
    closeMobileMenu();
  }
});
