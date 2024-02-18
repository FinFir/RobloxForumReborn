// script.js
document.addEventListener("DOMContentLoaded", function () {
  const postsList = document.getElementById("postsList");
  const postForm = document.getElementById("postForm");

  const ipfs = window.IpfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https'
  });

  async function savePostToIPFS(title, content) {
    const result = await ipfs.add(window.IpfsHttpClient.Buffer.from(content));
    const postHash = result.cid.toString();

    // Save the post hash locally
    savePostHashLocally(title, postHash);
  }

  async function getAllPostsFromIPFS() {
    const savedPosts = getSavedPostsLocally();

    const posts = await Promise.all(savedPosts.map(async post => {
      const content = await ipfs.cat(post.hash);
      return {
        title: post.title,
        content: content.toString(),
      };
    }));

    return posts;
  }

  function savePostHashLocally(title, hash) {
    const savedPosts = getSavedPostsLocally();
    savedPosts.push({ title, hash });
    localStorage.setItem('forumPosts', JSON.stringify(savedPosts));
  }

  function getSavedPostsLocally() {
    return JSON.parse(localStorage.getItem('forumPosts')) || [];
  }

  async function displayRecentPosts() {
    // Clear existing posts
    postsList.innerHTML = "";

    // Retrieve posts from IPFS
    const savedPosts = await getAllPostsFromIPFS();

    savedPosts.forEach(post => {
      const postElement = document.createElement("li");
      postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
      postsList.appendChild(postElement);
    });
  }

  postForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    // Simulate sending data to IPFS
    await savePostToIPFS(title, content);

    // Add the post to the recent posts list
    displayRecentPosts();

    // Clear the form after submission
    postForm.reset();
  });

  // Display recent posts on page load
  displayRecentPosts();
});
