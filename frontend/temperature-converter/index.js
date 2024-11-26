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

dropdownContent.addEventListener('click', function (event) {
  const selectedSvgIcons = dropdownContent.querySelectorAll('svg');
  selectedSvgIcons.forEach((e) => e.remove());

  event.target.classList.add('selected');
  event.target.insertAdjacentHTML('beforeend', svgSelectedIcon);
  dropdownValue.textContent = event.target.textContent;

  hideDropdown();
});

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

const temperatureInput = document.getElementById('temperatureInput');
temperatureInput.addEventListener('input', onInput);
function onInput(event) {
  console.log(temperatureInput.value);
  validateConvertBtn();
}
const convertBtn = document.getElementById('convertBtn');
convertBtn.addEventListener('click', onClick);

function onClick(params) {
  console.log(temperatureInput.value);
  //   validate

  //   const result = convertTemperature(temperatureInput.value, fromUnit, toUnit);
  //   console.log({ result });
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

  return `${inputValue}°${fromUnit} = ${result.toFixed(2)}°${toUnit}`;
}

// Example usage:
console.log(convertTemperature(34, 'C', 'F')); // Output: 34°C = 93.20°F
console.log(convertTemperature(93.2, 'F', 'K')); // Output: 93.2°F = 307.15°K
console.log(convertTemperature(307.15, 'K', 'C')); // Output: 307.15°K = 34.00°C

function validateConvertBtn(params) {
  if (temperatureInput.value) {
    convertBtn.disabled = false;
  } else {
    convertBtn.disabled = true;
  }
}
