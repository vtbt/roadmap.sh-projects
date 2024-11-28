const dropdownBtn = document.getElementById('dropdown-button');
const dropdownValue = document.getElementById('dropdown-value');
const dropdownContent = document.getElementById('dropdown-content');
const arrowUp = document.getElementById('arrow-up');
const arrowDown = document.getElementById('arrow-down');

const svgSelectedIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#000000">
                    <path
                        d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                </svg>
`;

dropdownBtn.addEventListener('click', function () {
  if (dropdownContent.classList.contains('opened')) {
    hideDropdown();
    return;
  }
  showDropdown();
});

dropdownContent.addEventListener('click', handleSelectDropdown);
dropdownContent.addEventListener('keydown', function onKeydown(event) {
  if (event.key === 'Enter') {
    handleSelectDropdown(event);
  }
});

function handleSelectDropdown(event) {
  const selectedSvgIcons = dropdownContent.querySelectorAll('svg');
  selectedSvgIcons.forEach((e) => e.remove());

  event.target.classList.add('selected');
  event.target.insertAdjacentHTML('beforeend', svgSelectedIcon);
  dropdownValue.textContent = event.target.textContent;

  hideDropdown();
}

function showDropdown() {
  dropdownContent.classList.add('opened');
  arrowDown.style.display = 'none';
  arrowUp.style.display = 'block';
}
function hideDropdown() {
  dropdownContent.classList.remove('opened');
  arrowUp.style.display = 'none';
  arrowDown.style.display = 'block';
}
