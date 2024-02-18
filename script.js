// script.js
document.addEventListener("DOMContentLoaded", async function () {
  const postsList = document.getElementById("postsList");
  const postForm = document.getElementById("postForm");

  // Initialize IPFS
  const ipfs = window.IpfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

  async function handlePostSubmission(event) {
    event.preventDefault();
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;

    // Save post to IPFS
    const ipfsHash = await savePostToIPFS(title, content);

    // Display the post
    displayRecentPosts();
    // Clear the form after submission
    postForm.reset();
  }

  async function savePostToIPFS(title, content) {
    const post = { title, content, timestamp: new Date().toLocaleString() };

    // Convert post to JSON
    const jsonData = JSON.stringify(post);

    // Add post to IPFS
    const { cid } = await ipfs.add(ipfs.types.Buffer.from(jsonData));

    return cid.toString();
  }

  async function displayRecentPosts() {
    postsList.innerHTML = "";

    // Retrieve posts from IPFS
    const posts = await getAllPostsFromIPFS();

    posts.forEach(post => {
      const postElement = document.createElement("li");
      postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
      postsList.appendChild(postElement);
    });
  }

  async function getAllPostsFromIPFS() {
    try {
      // Fetch posts from IPFS
      const posts = await ipfs.cat('your-ipfs-hash'); // Replace 'your-ipfs-hash' with the actual hash you want to fetch
      const postsJson = await posts.json();

      return [postsJson];
    } catch (error) {
      console.error("Error fetching posts from IPFS:", error);
      return [];
    }
  }

  displayRecentPosts();
  postForm.addEventListener("submit", handlePostSubmission);
});
