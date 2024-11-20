const showPopupBtn = document.getElementById('showPopupBtn');
const addBtn = document.getElementById('addBtn');
const input = document.getElementById('input');
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
    addSubreddit(input.value);
    input.value = ''; // Optional: clear input after processing
    popup.style.display = 'none';
  }
});

function showPopup() {
  // show popup for user inputs from user
  popup.style.display = 'block';
}

async function addSubreddit() {
  if (input.value) {
    fetchSubredditData(input.value);
  }
  input.value = '';
  popup.style.display = 'none';
}

// Event handler for closing the popup using the (x)
closeBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Event handler for closing the popup when clicking outside
window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});

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
    laneElement.classList.add('lane');

    const headline = document.createElement('div');
    headline.classList.add('headline');
    headline.innerHTML = `
    
                    <h3>/r/${subreddit}</h3>
                   <button id="action" class="action-btn">${moreVertIcon}</button>`;

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
      <div>
      <h3>${post.data.title}</h3>
        <p>Author: ${post.data.author}</p>
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
