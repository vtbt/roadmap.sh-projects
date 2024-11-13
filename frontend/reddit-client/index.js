// DOM Elements
const subredditInput = document.getElementById('subredditInput');
const addLaneBtn = document.getElementById('addLaneBtn');
const lanesContainer = document.getElementById('lanesContainer');
const errorElement = document.getElementById('error');

// Retrieve saved lanes from local storage
let lanes = JSON.parse(localStorage.getItem('lanes')) || [];

// Function to create a new lane
async function addLane(subreddit) {
  // Check if subreddit already exists
  if (lanes.includes(subreddit)) {
    alert('Subreddit is already added.');
    return;
  }

  try {
    // Fetch subreddit data
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) throw new Error('Subreddit not found');
    const data = await response.json();

    // Display lane with subreddit posts
    displayLane(subreddit, data);

    // Add subreddit to local storage
    lanes.push(subreddit);
    localStorage.setItem('lanes', JSON.stringify(lanes));

    // Clear input field
    subredditInput.value = '';
  } catch (error) {
    console.error(error);
    errorElement.classList.remove('hidden');
    setTimeout(() => errorElement.classList.add('hidden'), 3000);
  }
}

// Function to display lane with posts
function displayLane(subreddit, data) {
  const lane = document.createElement('div');
  lane.classList.add('lane');

  const laneHeader = document.createElement('h2');
  laneHeader.textContent = `/r/${subreddit}`;
  lane.appendChild(laneHeader);

  const posts = data.data.children;

  posts.slice(0, 5).forEach((postData) => {
    const post = document.createElement('div');
    post.classList.add('post');

    const postTitle = document.createElement('h3');
    postTitle.textContent = postData.data.title;
    post.appendChild(postTitle);

    const postAuthor = document.createElement('p');
    postAuthor.textContent = `Author: ${postData.data.author}`;
    post.appendChild(postAuthor);

    const postVotes = document.createElement('p');
    postVotes.textContent = `Votes: ${postData.data.ups}`;
    post.appendChild(postVotes);

    lane.appendChild(post);
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.onclick = () => removeLane(lane, subreddit);
  lane.appendChild(removeBtn);

  lanesContainer.appendChild(lane);
}

// Remove lane and update local storage
function removeLane(laneElement, subreddit) {
  lanesContainer.removeChild(laneElement);
  lanes = lanes.filter((l) => l !== subreddit);
  localStorage.setItem('lanes', JSON.stringify(lanes));
}

// Load saved lanes from local storage on page load
function loadSavedLanes() {
  lanes.forEach((subreddit) => {
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then((response) => response.json())
      .then((data) => displayLane(subreddit, data))
      .catch((error) => console.error('Failed to load saved lane:', error));
  });
}

// Add event listener to add new lane
addLaneBtn.addEventListener('click', () => {
  const subreddit = subredditInput.value.trim();
  if (subreddit) {
    addLane(subreddit);
  }
});

// Load lanes on page load
loadSavedLanes();
