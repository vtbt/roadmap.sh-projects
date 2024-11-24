const laneContainer = document.getElementById('container');
const addBtn = document.getElementById('addBtn');
const input = document.getElementById('input');
const inputError = document.getElementById('inputError');
const loading = document.getElementById('loading');

// Get DOM elements using modern selectors
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closeBtn');

const showPopupBtn = document.createElement('button');
showPopupBtn.id = 'showPopupBtn';
showPopupBtn.classList.add('show-popup-btn');
showPopupBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>`;

// Initialize lanes array from local storage or empty array if none exists
let lanes = JSON.parse(localStorage.getItem('lanes')) || [];

const moreVertIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>`;

const voteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>`;

// Event handler for showing the popup
showPopupBtn.addEventListener('click', showPopup);

function showPopup() {
  popup.style.display = 'flex';
  requestAnimationFrame(() => {
    input.focus();
  });
  laneContainer.setAttribute('inert', '');
}
function closePopup() {
  input.value = '';
  popup.style.display = 'none';
  input.classList.remove('error');
  inputError.style.display = 'none';
  laneContainer.removeAttribute('inert', '');
}

// Event handler for closing the popup using the (x)
closeBtn.addEventListener('click', () => {
  closePopup();
});

// Event handler for closing the popup when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    closePopup();
  }
});
// Event handler for closing the popup when pressing Escape key
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup();
  }
});

// Event handler for adding subreddit
addBtn.addEventListener('click', addLane);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addLane();
  }
});

// Function to render lanes with subreddit data
async function renderLanes() {
  laneContainer.innerHTML = ''; // Clear existing content
  laneContainer.appendChild(showPopupBtn);

  for (const subreddit of lanes) {
    await renderLane(subreddit);
  }
}

// Function to render a single lane with subreddit data
async function renderLane(subreddit) {
  // Insert the lane before the show popup button
  const newLane = await createLane(subreddit);
  laneContainer.insertBefore(newLane, showPopupBtn);
}

async function createLane(subreddit) {
  loading.classList.remove('hidden');
  const lane = document.createElement('div');
  lane.id = `lane-${subreddit}`;
  lane.classList.add('lane');
  try {
    const data = await fetchSubredditData(subreddit);
    // This function returns a new lane element (or updated content for the lane)

    // Create the headline container
    const headline = document.createElement('div');
    headline.classList.add('headline');

    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');

    // Create dropdown button
    const actionBtn = document.createElement('button');
    actionBtn.classList.add('action-btn');
    actionBtn.setAttribute('data-subreddit', subreddit);
    actionBtn.innerHTML = moreVertIcon;

    // Create the dropdown content (ul)
    const dropdownContent = document.createElement('ul');
    dropdownContent.classList.add('dropdown-content');
    dropdownContent.setAttribute('id', `dropdownContent-${subreddit}`);

    actionBtn.addEventListener('click', function showDropDown(params) {
      dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    const refreshLi = document.createElement('li');
    refreshLi.tabIndex = 0;
    refreshLi.classList.add('refresh-btn');
    refreshLi.innerText = 'Refresh';
    refreshLi.onclick = () => refreshLane(subreddit, lane);
    dropdownContent.appendChild(refreshLi);

    const deleteLi = document.createElement('li');
    deleteLi.tabIndex = 0;
    deleteLi.classList.add('delete-btn');
    deleteLi.innerHTML = 'Delete';
    deleteLi.onclick = () => deleteLane(subreddit);
    dropdownContent.appendChild(deleteLi);

    // Assemble the final structure
    dropdown.appendChild(actionBtn); // Add the action button to dropdown
    dropdown.appendChild(dropdownContent); // Add the dropdown content (ul) to dropdown
    headline.innerHTML = `<h3>/r/${subreddit}</h3>`;
    headline.appendChild(dropdown); // Add dropdown to headline

    lane.appendChild(headline);

    if (data && data.length > 0) {
      // todo - click to see post
      data.slice(0, 5).forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post-item');
        postElement.innerHTML = `
            <div class="vote">
              <div>${voteIcon}</div>
              <p>${post.ups}</p>
            </div>
            <div class="content">
              <h3 class="title">${post.title}</h3>
              <p class="author">${post.author}</p>
            </div>
              `;
        lane.appendChild(postElement);
      });
    } else {
      lane.innerHTML += `<p>No posts found.</p>`;
    }
  } catch (error) {
    alert('Subreddit not found!');
    lanes = lanes.filter((item) => item !== subreddit);
    updateLocalStorage();
    return;
  } finally {
    loading.classList.add('hidden');
  }

  return lane;
}

// Function to fetch subreddit data from Reddit JSON API
async function fetchSubredditData(subreddit) {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const json = await response.json();
  return json.data.children.map((post) => post.data); // Extract posts
}

// Function to refresh a specific lane
async function refreshLane(subreddit, laneElement) {
  laneElement.innerHTML = `<h3>r/${subreddit}</h3><p>Loading...</p>`;
  // Step 1: Save the reference to the parent container of the lane
  const parentContainer = laneElement.parentNode;

  // Step 2: Save the index of the lane in the parent container (if needed)
  const laneIndex = Array.from(parentContainer.children).indexOf(laneElement);

  // Step 3: Remove the old lane (or update it)
  parentContainer.removeChild(laneElement);

  // Step 4: Recreate the lane content (or refresh it)
  const newLane = await createLane(subreddit); // You can create or refresh the lane content

  // Step 5: Re-insert the lane at the same position
  parentContainer.insertBefore(
    newLane,
    parentContainer.children[laneIndex] || null
  ); // Insert at the same position, or at the end if the index is invalid

  //   await renderLane(subreddit); // Re-fetch and re-render the lane
}

// Function to add a new lane
function addLane() {
  const subreddit = input.value.trim();
  if (!subreddit) {
    input.classList.add('error');
    inputError.style.display = 'block';
    return;
  }
  if (lanes.includes(subreddit)) {
    alert('Subreddit is either empty or already added!');
    return;
  }
  lanes.push(subreddit);
  updateLocalStorage();
  renderLane(subreddit);
  closePopup();
}

// Function to remove a lane
function deleteLane(subreddit) {
  lanes = lanes.filter((item) => item !== subreddit);
  updateLocalStorage();
  renderLanes();
}

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('lanes', JSON.stringify(lanes));
}

// Initial render on page load
renderLanes();

// todo - get a post
//https://reddit.com${post.data.permalink}

// Event Delegation for Dropdown Menus
document.addEventListener('click', function (event) {
  // Close dropdowns when clicking outside
  const openDropdowns = document.querySelectorAll(
    '.dropdown-content[style*="display: block"]'
  );
  openDropdowns.forEach((dropdown) => {
    if (!dropdown.closest('.dropdown').contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });
});

// Blur and Keyboard Event Handling for Dropdown
document.addEventListener('focusout', function (event) {
  // Check if the blur is happening outside the entire dropdown
  const dropdown = event.target.closest('.dropdown');

  if (dropdown) {
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdownContent.addEventListener('focusout', function (event) {
      if (!dropdownContent.contains(event.relatedTarget)) {
        dropdownContent.style.display = 'none';
      }
    });
  }
});
