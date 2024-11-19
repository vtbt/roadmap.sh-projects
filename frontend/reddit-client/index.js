const showPopupBtn = document.getElementById('showPopupBtn');
const addBtn = document.getElementById('addBtn');
const input = document.getElementById('input');
const container = document.getElementById('container');

let data = [];

let enteredValue = '';

// Get DOM elements using modern selectors
const popup = document.querySelector('#popup');
const closeBtn = document.querySelector('#closeBtn');

// Event handler for showing the popup
showPopupBtn.addEventListener('click', showPopup);

// Event handler for adding subreddit
addBtn.addEventListener('click', addSubreddit);

input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent default Enter key behavior if needed
    enteredValue = input.value;
    addSubreddit(enteredValue);
    input.value = ''; // Optional: clear input after processing
    enteredValue = '';
    popup.style.display = 'none';
  }
});

function showPopup() {
  // show popup for user inputs from user
  popup.style.display = 'block';
}

async function addSubreddit() {
  // fetch subreddit with input from user
  console.log('add', input.value);
  enteredValue = input.value;
  if (enteredValue) {
    fetchSubredditData(enteredValue);
  }
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
    const headline = document.createElement('div');
    headline.innerHTML = `
                    <h3>r/${subreddit}</h3>
                   <button id="action">three dots</button>`;

    laneElement.appendChild(headline);

    // Extract and display posts
    const posts = data.data.children;
    posts.forEach((post) => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
                    <h3>${post.data.title}</h3>
                    <p>Author: ${post.data.author}</p>
                    <p>Upvotes: ${post.data.ups}</p>
                    <a href="https://reddit.com${post.data.permalink}" target="_blank">View Post</a>
                `;
      laneElement.appendChild(postElement);

      showPopupBtn.insertAdjacentElement('beforebegin', laneElement);
    });
  } catch (error) {
    // Handle errors
    //   `<p style="color: red;">Error: ${error.message}</p>`;
  }
};
