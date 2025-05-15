const mobileMenuButtonEl = document.querySelector('#mobile-menu-button');
const mobileMenuEl = document.querySelector('#mobile-menu') as HTMLDivElement;

mobileMenuButtonEl?.addEventListener('click', () => {
  mobileMenuEl.classList.toggle('expanded');
});
