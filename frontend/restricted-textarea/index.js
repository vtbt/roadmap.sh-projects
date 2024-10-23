const LIMIT = 250;
const textareaContainer = document.getElementById('restricted-textarea');
const realtimeCharacter = document.getElementById('realtime-character');
let lastValidValue = '';

function onInput(event) {
  const length = event.target.value.length;
  realtimeCharacter.textContent = length;

  if (length > LIMIT) {
    // Prevent the new input by reverting to the last valid value
    event.target.value = lastValidValue;
    realtimeCharacter.textContent = lastValidValue.length;

    // Show warning
    warning.textContent = 'Character limit reached!';
    textareaContainer.classList.add('limit-reached');

    // Clear warning after 1 second
    setTimeout(() => {
      warning.textContent = '';
    }, 1000);
  } else {
    // Store the last valid value
    lastValidValue = event.target.value;
    textareaContainer.classList.remove('limit-reached');
  }
}
