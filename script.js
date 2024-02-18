// script.js
document.addEventListener("DOMContentLoaded", function () {
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

   function handlePostSubmission(event) {
      event.preventDefault();
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;

      // Simulate sending data to GitHub Issues
      simulateServerPost(title, content);
      // For a real implementation, send this data to GitHub Issues using AJAX or Fetch API
   }

   function simulateServerPost(title, content) {
      // Simulate server response
      const post = { title, content, timestamp: new Date().toLocaleString() };

      // Create a new GitHub Issue
      createGitHubIssue(post);

      // Clear the form after submission
      postForm.reset();
   }

   function createGitHubIssue(post) {
      const apiUrl = 'https://api.github.com/FinFir/RobloxForumReborn/issues';
      const accessToken = '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';  // Replace with your GitHub access token

      // Send a POST request to create a new GitHub Issue
      fetch(apiUrl, {
         method: 'POST',
         headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            title: post.title,
            body: post.content,
         }),
      })
      .then(response => response.json())
      .then(data => {
         console.log('GitHub Issue created:', data);

         // Fetch and display updated posts from GitHub Issues
         displayRecentPosts();
      })
      .catch(error => console.error('Error creating GitHub Issue:', error));
   }

   function fetchPostsFromGitHub() {
      const apiUrl = 'https://api.github.com/FinFir/RobloxForumReborn/issues';
      const accessToken = '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';  // Replace with your GitHub access token

      // Fetch posts from GitHub Issues
      return fetch(apiUrl, {
         headers: {
            'Authorization': `token ${accessToken}`,
            'Content-Type': 'application/json',
         },
      })
      .then(response => response.json())
      .then(data => {
         const posts = data.map(issue => ({
            title: issue.title,
            content: issue.body,
            timestamp: new Date(issue.created_at).toLocaleString(),
         }));
         return posts;
      })
      .catch(error => {
         console.error('Error fetching GitHub Issues:', error);
         return [];
      });
   }

   function displayRecentPosts() {
      // Clear existing posts
      postsList.innerHTML = "";

      // Fetch posts from GitHub Issues
      fetchPostsFromGitHub().then(posts => {
         posts.forEach(post => {
            const postElement = document.createElement("li");
            postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
            postsList.appendChild(postElement);
         });
      });
   }

   displayCategories();
   displayRecentPosts();
   postForm.addEventListener("submit", handlePostSubmission);
});
