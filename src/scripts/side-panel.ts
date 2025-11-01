const sidePanelButton = document.querySelector('#side-panel-button') as HTMLButtonElement;
const sidePanelEl = document.querySelector('#side-panel') as HTMLDivElement;
const sidePanelMaskEl = document.querySelector('#side-panel-mask') as HTMLDivElement;

export function toggleSidePanel() {
  const isOpen = sidePanelEl.hasAttribute('side-panel-open');
  sidePanelEl.toggleAttribute('side-panel-open');

  if (isOpen) {
    sidePanelButton.setAttribute('data-panel-state', 'closed');
  } else {
    sidePanelButton.setAttribute('data-panel-state', 'open');
  }
}

sidePanelButton.addEventListener('click', toggleSidePanel);
sidePanelMaskEl.addEventListener('click', toggleSidePanel);
