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

      // Save the post to a GitHub Gist
      savePostToGist(title, content);
   }

   async function savePostToGist(title, content) {
      const gistApiUrl = 'https://api.github.com/gists';
      const response = await fetch(gistApiUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            files: {
               'post.json': {
                  content: JSON.stringify({ title, content }),
               },
            },
            public: true,
         }),
      });

      if (response.ok) {
         console.log('Post saved to Gist successfully');
         // Display the posts
         displayRecentPosts();
         // Clear the form after submission
         postForm.reset();
      } else {
         console.error('Error saving post to Gist');
      }
   }

   function displayRecentPosts() {
      // Clear existing posts
      postsList.innerHTML = "";

      // Retrieve posts from the Gist API
      const gistApiUrl = 'https://api.github.com/gists/public';
      fetch(gistApiUrl)
         .then(response => {
            if (!response.ok) {
               throw new Error('Network response was not ok');
            }
            return response.json();
         })
         .then(gists => {
            gists.forEach(gist => {
               const files = gist.files;
               const postFile = files && files['post.json'];
               if (postFile) {
                  const post = JSON.parse(postFile.content);
                  const postElement = document.createElement("li");
                  postElement.innerHTML = `<strong>${post.title}</strong><p>${post.content}</p>`;
                  postsList.appendChild(postElement);
               }
            });
         })
         .catch(error => console.error('Error fetching posts from Gist API:', error));
   }

   displayCategories();
   displayRecentPosts();
   postForm.addEventListener("submit", handlePostSubmission);
});
