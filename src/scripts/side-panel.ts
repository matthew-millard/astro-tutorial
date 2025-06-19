const sidePanelButton = document.querySelector('#side-panel-button') as HTMLButtonElement;
const sidePanelEl = document.querySelector('#side-panel') as HTMLDivElement;
const sidePanelMaskEl = document.querySelector('#side-panel-mask') as HTMLDivElement;

function toggleSidePanel() {
  sidePanelEl.toggleAttribute('side-panel-open');
}

sidePanelButton.addEventListener('click', toggleSidePanel);
sidePanelMaskEl.addEventListener('click', toggleSidePanel);
