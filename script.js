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

      // Simulate sending data to the server
      simulateServerPost(title, content);
      // For a real implementation, send this data to the server for processing and storage
   }

   function simulateServerPost(title, content) {
      // Simulate server response
      const post = { title, content, timestamp: new Date().toLocaleString() };

      // Add the post to the recent posts list
      const postElement = document.createElement("li");
      postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
      postsList.appendChild(postElement);

      // Clear the form after submission
      postForm.reset();
   }

   function displayRecentPosts() {
      // Simulate retrieving recent posts from the server
      const samplePosts = [
         { title: "First Post", content: "Hello, Roblox community!", timestamp: "2024-02-20 12:30 PM" },
         { title: "Game Development Tips", content: "Share your game development insights here.", timestamp: "2024-02-21 10:45 AM" },
         // Add more posts as needed
      ];

      samplePosts.forEach(post => {
         const postElement = document.createElement("li");
         postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
         postsList.appendChild(postElement);
      });
   }

   displayCategories();
   displayRecentPosts();
   postForm.addEventListener("submit", handlePostSubmission);
});
