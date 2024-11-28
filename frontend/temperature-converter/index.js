const svgSelectedIcon = `
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                    fill="#000000">
                    <path
                        d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
                </svg>
`;

// Define the mapping
const unitMap = {
  C: 'Celsius',
  F: 'Fahrenheit',
  K: 'Kelvin',
};

let selectedDropdownValues = {
  fromUnit: null,
  toUnit: null,
};

const result = document.getElementById('result');
const error = document.getElementById('error');

const temperatureInput = document.getElementById('temperatureInput');
temperatureInput.addEventListener('input', onInput);

function onInput() {
  validateConvertBtn();
}

const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', onClick);

function validateConvertBtn() {
  if (
    temperatureInput.value &&
    selectedDropdownValues.fromUnit &&
    selectedDropdownValues.toUnit
  ) {
    convertBtn.disabled = false;
  } else {
    convertBtn.disabled = true;
  }
}

function isStrictValidFloat(str) {
  // Regular expression to check for a valid number (integer or float)
  return /^-?\d+(\.\d+)?$/.test(str.trim());
}

function onClick() {
  const temperatureInputValue = temperatureInput.value;

  if (!isStrictValidFloat(temperatureInputValue)) {
    result.style.display = 'none';

    error.style.display = 'block';
    error.textContent = 'Please enter a valid number for the temperature.';
    return;
  }

  const resultText = convertTemperature(
    parseFloat(temperatureInputValue),
    selectedDropdownValues.fromUnit,
    selectedDropdownValues.toUnit
  );
  error.style.display = 'none';

  result.textContent = resultText;
  result.style.display = 'block';
}

function convertTemperature(inputValue, fromUnit, toUnit) {
  let result;

  // Convert input to Celsius first
  let celsius;
  switch (fromUnit) {
    case 'C':
      celsius = inputValue;
      break;
    case 'F':
      celsius = ((inputValue - 32) * 5) / 9;
      break;
    case 'K':
      celsius = inputValue - 273.15;
      break;
    default:
      return 'Invalid from unit! Use "C", "F", or "K".';
  }

  // Convert from Celsius to the desired unit
  switch (toUnit) {
    case 'C':
      result = celsius;
      break;
    case 'F':
      result = (celsius * 9) / 5 + 32;
      break;
    case 'K':
      result = celsius + 273.15;
      break;
    default:
      return 'Invalid to unit! Use "C", "F", or "K".';
  }

  return `${inputValue.toFixed(1)} ${unitMap[fromUnit]} is ${result.toFixed(
    1
  )} ${unitMap[toUnit]}`;
}

class Dropdown {
  constructor(selector) {
    this.dropdown = document.querySelector(selector);
    this.button = this.dropdown.querySelector('.dropdown-button');
    this.menu = this.dropdown.querySelector('.dropdown-content');
    this.dropdownValue = this.dropdown.querySelector('.dropdown-value');
    this.arrowUp = this.dropdown.querySelector('.arrow-up');
    this.arrowDown = this.dropdown.querySelector('.arrow-down');
    this.init();
  }

  init() {
    // Toggle dropdown when button is clicked
    this.button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent event bubbling
      this.closeOtherDropdowns(); // Close other dropdowns
      this.toggleMenu();
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (e) => {
      if (!this.dropdown.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Handle item selection
    this.menu.querySelectorAll('li').forEach((item) => {
      item.addEventListener('click', () => {
        this.selectItem(item);
      });
    });
  }

  toggleMenu() {
    if (this.menu.classList.contains('opened')) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  closeOtherDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach((otherMenu) => {
      if (otherMenu !== this.menu) {
        otherMenu.classList.remove('opened');
      }
    });
    document.querySelectorAll('.arrow-up').forEach((otherArrowUp) => {
      if (otherArrowUp !== this.arrowUp) {
        otherArrowUp.style.display = 'none';
      }
    });
    document.querySelectorAll('.arrow-down').forEach((otherArrowDown) => {
      if (otherArrowDown !== this.arrowDown) {
        otherArrowDown.style.display = 'block';
      }
    });
  }

  closeMenu() {
    this.menu.classList.remove('opened');
    this.arrowDown.style.display = 'block';
    this.arrowUp.style.display = 'none';
  }
  openMenu() {
    this.menu.classList.add('opened');
    this.arrowDown.style.display = 'none';
    this.arrowUp.style.display = 'block';
  }

  selectItem(item) {
    this.dropdownValue.textContent = item.textContent; // Update selected dropdown value text
    this.closeMenu();

    // Add SVG icon to the selected item
    this.addSelectedIcon(item);

    // Update the selected value in the global object
    selectedDropdownValues[this.dropdown.id] = item.dataset.value;
    validateConvertBtn();
  }

  addSelectedIcon(item) {
    // Remove existing icons (if any)
    this.menu.querySelectorAll('li').forEach((li) => {
      li.classList.remove('selected');
      const icon = li.querySelector('.selected-icon');
      if (icon) {
        icon.remove();
      }
    });

    // Add the SVG icon to the selected item
    const svgIcon = this.createSelectedIcon();
    item.classList.add('selected'); // Mark item as selected
    item.appendChild(svgIcon); // Append the icon to the item
  }

  createSelectedIcon() {
    // Create the SVG icon (can also be dynamically created based on the item)
    const svgIcon = document.createElement('span');
    svgIcon.classList.add('selected-icon');
    svgIcon.innerHTML = svgSelectedIcon;
    return svgIcon;
  }
}

// Initialize multiple dropdowns
document.addEventListener('DOMContentLoaded', () => {
  new Dropdown('#fromUnit');
  new Dropdown('#toUnit');
});
