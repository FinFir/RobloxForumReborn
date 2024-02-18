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

      // Send the post to JSONPlaceholder
      savePostToJSONPlaceholder(title, content);

      // Display the posts
      displayRecentPosts();
      
      // Clear the form after submission
      postForm.reset();
   }

   function savePostToJSONPlaceholder(title, content) {
      // Use the JSONPlaceholder API to create a new post
      fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            title: title,
            body: content,
            userId: 1,  // You can set a specific user ID
         }),
      })
      .then(response => response.json())
      .then(data => console.log('Post created:', data))
      .catch(error => console.error('Error creating post:', error));
   }

   function displayRecentPosts() {
      // Clear existing posts
      postsList.innerHTML = "";

      // Fetch posts from JSONPlaceholder API
      fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(posts => {
            posts.slice(-5).forEach(post => {
               const postElement = document.createElement("li");
               postElement.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p><small>${post.id}</small>`;
               postsList.appendChild(postElement);
            });
         })
         .catch(error => console.error('Error fetching posts:', error));
   }

   displayCategories();
   displayRecentPosts();
   postForm.addEventListener("submit", handlePostSubmission);
});
