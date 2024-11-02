const dropdownBtn = document.getElementById('dropdown-button');
const dropdownContent = document.getElementById('dropdown-content');
const arrowUp = document.getElementById('arrow-up');
const arrowDown = document.getElementById('arrow-down');
dropdownBtn.addEventListener('click', function () {
  arrowDown.style.display = 'none';
  arrowUp.style.display = 'block';
  dropdownContent.style.display = 'flex';
});
