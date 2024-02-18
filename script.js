// script.js
document.addEventListener("DOMContentLoaded", async function () {
  // Wait for the IPFS library to be loaded
  await new Promise((resolve) => {
    const checkLibraryLoaded = () => {
      if (window.IpfsHttpClient) {
        resolve();
      } else {
        setTimeout(checkLibraryLoaded, 100);
      }
    };

    checkLibraryLoaded();
  });

  // Initialize IPFS
  const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  const categoriesSection = document.getElementById("categories");
  const newPostSection = document.getElementById("newPost");
  const postsList = document.getElementById("postsList");
  const postForm = document.getElementById("postForm");

  const categories = [
    { name: "General Discussion", id: 1 },
    { name: "Game Development", id: 2 },
    // Add more categories as needed
  ];

  function displayCategories() {
    categories.forEach(category => {
      const categoryElement = document.createElement("div");
      categoryElement.classList.add("category");
      categoryElement.innerHTML = `<h2>${category.name}</h2>`;
      categoryElement.addEventListener("click", () => { /* Handle category click */ });
      categoriesSection.appendChild(categoryElement);
    });
  }

  async function handlePostSubmission(event) {
    event.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    // Save post to IPFS
    const postCID = await savePostToIPFS(title, content);

    // For a real implementation, you might want to store the CID in a server or a decentralized database.

    // Display the post
    displayRecentPosts();
    // Clear the form after submission
    postForm.reset();
  }

  async function savePostToIPFS(title, content) {
    // Check if ipfs is defined
    if (!window.IpfsHttpClient) {
      console.error('IPFS library not loaded.');
      return;
    }

    // Create a JavaScript object representing the post
    const post = { title, content, timestamp: new Date().toLocaleString() };

    // Convert the post object to a JSON string
    const postString = JSON.stringify(post);

    // Convert the JSON string to a Uint8Array
    const postData = new TextEncoder().encode(postString);

    // Add the data to IPFS
    const result = await ipfs.add(postData);

    // The CID (Content ID) of the added data is in result.path
    console.log("Post added to IPFS. CID:", result.path);

    return result.path;
  }

  function displayRecentPosts() {
    // Clear existing posts
    postsList.innerHTML = "";

    // Retrieve posts from IPFS
    getAllPostsFromIPFS().then(posts => {
      posts.forEach(post => {
        const postElement = document.createElement("li");
        postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
        postsList.appendChild(postElement);
      });
    });
  }

  async function getAllPostsFromIPFS() {
    // Check if ipfs is defined
    if (!window.IpfsHttpClient) {
      console.error('IPFS library not loaded.');
      return [];
    }

    // Get all posts from IPFS
    const posts = [];

    for await (const file of ipfs.ls('/')) {
      const content = await ipfs.cat(file.path);
      const post = JSON.parse(new TextDecoder().decode(content));
      posts.push(post);
    }

    return posts;
  }

  displayCategories();
  displayRecentPosts();
  postForm.addEventListener("submit", handlePostSubmission);
});
