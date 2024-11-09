const dropdown = document.getElementById('dropdown');
const dropdownBtn = document.getElementById('dropdown-button');
const dropdownValue = document.getElementById('dropdown-value');
const dropdownContent = document.getElementById('dropdown-content');
const arrowUp = document.getElementById('arrow-up');
const arrowDown = document.getElementById('arrow-down');

const statusContainer = document.getElementById('statusContainer');
const statusText = document.getElementById('statusText');
const successResult = document.getElementById('successResult');

const retryBtn = document.getElementById('retryBtn');
const refreshBtn = document.getElementById('refreshBtn');

let searchedLanguage = '';

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

  searchedLanguage = event.target.id;
  if (searchedLanguage) {
    searchRepositories(searchedLanguage);
  } else {
    successResult.style.display = 'none';
    statusContainer.style.display = 'block';
    statusText.textContent = 'Please select a language';
    statusContainer.classList.remove('error');
    retryBtn.style.display = 'none';
  }

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

window.addEventListener('click', (e) => {
  if (!dropdown.contains(e.target)) {
    hideDropdown();
  }
});

async function getLanguages() {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function setDropdownContent() {
  const languages = await getLanguages();

  languages.forEach((language) => {
    const div = document.createElement('div');
    div.className = 'dropdown-item';
    div.id = language.value;
    div.textContent = language.title;

    dropdownContent.appendChild(div);
  });
}

setDropdownContent();

const searchRepositories = async (language) => {
  statusText.textContent = 'Loading, please wait...';

  successResult.style.display = 'none';
  const url = `https://api.github.com/search/repositories?q=language:${language}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.items.length);
    const randomRepo = data.items[randomIndex];

    successResult.style.display = 'block';
    statusContainer.style.display = 'none';
    successResult.replaceChildren();
    const cardDiv = document.createElement('div');
    cardDiv.className = 'repo-card';

    cardDiv.innerHTML = `
       <h1 class="name">${randomRepo.name}</h1>
                <p class="description">${randomRepo.description}</p>
                <div class="info">
                    <div class="language">
                        <span class="icon"></span>
                        <span>${randomRepo.language}</span>
                    </div>
                    <div class="stars">
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#000000">
                                <path
                                    d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
                            </svg>
                        </span>
                        <span>${randomRepo.stargazers_count}</span>
                    </div>
                    <div class="forks">
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#000000">
                                <path
                                    d="M440-80v-200q0-56-17-83t-45-53l57-57q12 11 23 23.5t22 26.5q14-19 28.5-33.5T538-485q38-35 69-81t33-161l-63 63-57-56 160-160 160 160-56 56-64-63q-2 143-44 203.5T592-425q-32 29-52 56.5T520-280v200h-80ZM248-633q-4-20-5.5-44t-2.5-50l-64 63-56-56 160-160 160 160-57 56-63-62q0 21 2 39.5t4 34.5l-78 19Zm86 176q-20-21-38.5-49T263-575l77-19q10 27 23 46t28 34l-57 57Z" />
                            </svg>
                        </span>
                        <span>${randomRepo.forks_count}</span>
                    </div>
                    <div class="issues">
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                fill="#000000">
                                <path
                                    d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                        </span>
                        <span>${randomRepo.open_issues_count}</span>
                    </div>

                </div>

    `;

    const refreshBtn = document.createElement('button');
    refreshBtn.classList.add('refresh-btn');
    refreshBtn.id = 'refreshBtn';
    refreshBtn.textContent = 'Refresh';
    refreshBtn.addEventListener('click', () => editUser(user.id));

    successResult.appendChild(cardDiv);
    successResult.appendChild(refreshBtn);
  } catch (error) {
    statusContainer.classList.add('error');
    statusText.textContent = 'Error fetching repositories';
    retryBtn.style.display = 'block';
    console.error('Error fetching data:', error);
  } finally {
  }
};

if (searchedLanguage) {
  searchRepositories(searchedLanguage);
}
