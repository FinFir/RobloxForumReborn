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

      // Save the post to local storage
      savePostToLocalstorage(title, content);
   }

   function savePostToLocalstorage(title, content) {
      const post = { title, content, timestamp: new Date().toLocaleString() };

      // Retrieve existing posts from local storage
      let savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];

      // Add the new post
      savedPosts.push(post);

      // Save the updated posts back to local storage
      localStorage.setItem("forumPosts", JSON.stringify(savedPosts));

      // Display the posts
      displayRecentPosts();
      
      // Clear the form after submission
      postForm.reset();
   }

   function displayRecentPosts() {
      // Clear existing posts
      postsList.innerHTML = "";

      // Retrieve posts from local storage
      const savedPosts = JSON.parse(localStorage.getItem("forumPosts")) || [];

      savedPosts.forEach(post => {
         const postElement = document.createElement("li");
         postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p><small>${post.timestamp}</small>`;
         postsList.appendChild(postElement);
      });
   }

   displayCategories();
   displayRecentPosts();
   postForm.addEventListener("submit", handlePostSubmission);
});
