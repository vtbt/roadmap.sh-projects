import { DateTime } from '/node_modules/luxon/build/es6/luxon.js';
import '/node_modules/js-datepicker/dist/datepicker.min.js';

const ageResultElement = document.getElementById('age-result');
const calculateAgeElement = document.getElementById('calculate-age');
const birthdateInputElement = document.getElementById('birthdate');

// Initialize datepicker
const picker = datepicker('#birthdate', {
  formatter: (input, date, instance) => {
    const value = date.toLocaleDateString('en-GB');
    input.value = value; // => 'dd/mm/yyyy'
  },
  maxDate: new Date(new Date().setDate(new Date().getDate() - 1)),
  showAllDates: true,
  onSelect: (instance, date) => {
    if (date instanceof Date) {
      ageResultElement.style.visibility = 'hidden';
    }
  },
});

// Function to calculate exact age
function calculateExactAge(birthdateString) {
  const birthdate = DateTime.fromFormat(birthdateString, 'dd/MM/yyyy');

  const now = DateTime.now();
  const diff = now.diff(birthdate, ['years', 'months', 'days']).toObject();

  const years = Math.floor(diff.years);
  const months = Math.floor(diff.months);
  const days = Math.floor(diff.days);

  let ageResult = '';
  if (years) {
    ageResult += `${years} year${years === 1 ? '' : 's'} `;
  }
  if (months) {
    ageResult += `${months} month${months === 1 ? '' : 's'} `;
  }
  if (days) {
    ageResult += `${days} day${days === 1 ? '' : 's'}`;
  }

  return ageResult;
}

// Function to validate the date format
function isValidDateFormat(dateString) {
  // Parse date with Luxon using the specified format
  const date = DateTime.fromFormat(dateString, 'dd/MM/yyyy');

  // Check if the date is valid
  return date.isValid;
}

calculateAgeElement.addEventListener('click', () => {
  const birthdateString = birthdateInputElement.value;

  let textContent = '';
  if (isValidDateFormat(birthdateString)) {
    const age = calculateExactAge(birthdateString);
    textContent = `You are ${age} old.`;
  } else {
    textContent = 'Please select your birthdate.';
  }
  ageResultElement.textContent = textContent;
  ageResultElement.style.visibility = 'visible';
});
