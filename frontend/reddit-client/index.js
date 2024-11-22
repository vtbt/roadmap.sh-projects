const showPopupBtn = document.getElementById('showPopupBtn');
const addBtn = document.getElementById('addBtn');
const input = document.getElementById('input');
const inputError = document.getElementById('input-error');
const container = document.getElementById('container');

let data = [];

const moreVertIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>`;

const voteIcon = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z"/></svg>`;

// Get DOM elements using modern selectors
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closeBtn');

// Event handler for showing the popup
showPopupBtn.addEventListener('click', showPopup);

// Event handler for adding subreddit
addBtn.addEventListener('click', addSubreddit);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addSubreddit();
  }
});

function showPopup() {
  popup.style.display = 'block';
}

async function addSubreddit() {
  if (!input.value) {
    // show warning message let user know to input value
    input.classList.add('error');
    inputError.style.display = 'block';
    return;
  }

  fetchSubredditData(input.value);
  closePopup();
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
// Event handler for closing the popup when clicking outside
window.addEventListener('keydown', (event) => {
  console.log(event.key);

  if (event.key === 'Escape') {
    closePopup();
  }
});

function showContextMenu(subreddit) {
  const dropdownContent = document.getElementById(
    `dropdownContent-${subreddit}`
  );
  console.log(subreddit, dropdownContent);

  dropdownContent.style.display = 'block';
}

// Fetch subreddit data
const fetchSubredditData = async (subreddit) => {
  try {
    // Construct the URL
    const url = `https://www.reddit.com/r/${subreddit}.json`;

    // Fetch data
    const response = await fetch(url);

    // Check if response is OK
    if (!response.ok) {
      throw new Error('Subreddit not found or network error');
    }

    // Parse JSON
    const data = await response.json();

    // Each lane will show the subreddit’s posts, including titles, authors, and vote counts.

    const laneElement = document.createElement('div');
    laneElement.id = `lane-${subreddit}`;
    laneElement.classList.add('lane');

    const headline = document.createElement('div');
    headline.classList.add('headline');

    headline.innerHTML = `
    
                    <h3>/r/${subreddit}</h3>
                    <div class="dropdown">
                    <button class="action-btn" data-subreddit="${subreddit}">${moreVertIcon}</button>
                     <ul id="dropdownContent-${subreddit}" class="dropdown-content">
    <li tabindex="0" class="refresh-btn" data-subreddit="${subreddit}">Refresh</li>
    <li tabindex="0" class="delete-btn" data-subreddit="${subreddit}">Delete</li>
  </ul>
                    </div>
                   `;

    laneElement.appendChild(headline);

    const posts = data.data.children;
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post-item');
      postElement.innerHTML = `
      <div class="vote">
      <div>
      ${voteIcon}
         </div>
        <p>${post.data.ups}</p>
      </div>
      <div class="content">
      <h3 class="title">${post.data.title}</h3>
        <p class="author">${post.data.author}</p>
    </div>
      
                `;
      laneElement.appendChild(postElement);

      showPopupBtn.insertAdjacentElement('beforebegin', laneElement);
    });
  } catch (error) {
    // Handle errors
    //   `<p style="color: red;">Error: ${error.message}</p>`;
  }
};

//https://reddit.com${post.data.permalink}

// Event Delegation for Dropdown Menus
document.addEventListener('click', function (event) {
  // Handle Action Button Clicks
  const actionBtn = event.target.closest('.action-btn');
  if (actionBtn) {
    console.log({ actionBtn });

    const subreddit = actionBtn.getAttribute('data-subreddit');
    const dropdownContent = document.getElementById(
      `dropdownContent-${subreddit}`
    );

    if (dropdownContent) {
      dropdownContent.style.display =
        dropdownContent.style.display === 'block' ? 'none' : 'block';
      event.stopPropagation();
    }
  }

  // Close dropdowns when clicking outside
  const openDropdowns = document.querySelectorAll(
    '.dropdown-content[style*="display: block"]'
  );
  openDropdowns.forEach((dropdown) => {
    if (!dropdown.closest('.dropdown').contains(event.target)) {
      dropdown.style.display = 'none';
    }
  });

  const refreshBtn = event.target.closest('.refresh-btn');
  if (refreshBtn) {
    console.log(refreshBtn.getAttribute('data-subreddit'));
  }
  const deleteBtn = event.target.closest('.delete-btn');
  if (deleteBtn) {
    console.log(deleteBtn.getAttribute('data-subreddit'));
    const deletedSubreddit = deleteBtn.getAttribute('data-subreddit');
    const deletedLane = document.getElementById(`lane-${deletedSubreddit}`);
    deletedLane.remove();
  }
});

// Blur and Keyboard Event Handling
document.addEventListener('focusout', function (event) {
  // Check if the blur is happening outside the entire dropdown
  const dropdown = event.target.closest('.dropdown');
  console.log('here');

  if (dropdown) {
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    dropdownContent.addEventListener('focusout', function (event) {
      console.log('hereeee', event.relatedTarget, event.currentTarget);
      if (!dropdownContent.contains(event.relatedTarget)) {
        console.log('not');
        dropdownContent.style.display = 'none';
      }
    });
  }
});

function closePopup() {
  input.value = '';
  popup.style.display = 'none';
  input.classList.remove('error');
  inputError.style.display = 'none';
}
