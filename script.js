// script.js
document.addEventListener("DOMContentLoaded", function () {
   const categoriesSection = document.getElementById("categories");
   const newPostSection = document.getElementById("newPost");
   const postForm = document.getElementById("postForm");

   // Simulated data for forum categories
   const categories = [
      { name: "General Discussion", id: 1 },
      { name: "Game Development", id: 2 },
      // Add more categories as needed
   ];

   // Function to display categories on the page
   function displayCategories() {
      categories.forEach(category => {
         const categoryElement = document.createElement("div");
         categoryElement.classList.add("category");
         categoryElement.innerHTML = `<h2>${category.name}</h2>`;
         // Add click event or link to category page
         categoryElement.addEventListener("click", () => { /* Handle category click */ });
         categoriesSection.appendChild(categoryElement);
      });
   }

   // Function to handle form submission (simulated)
   function handlePostSubmission(event) {
      event.preventDefault();
      const title = document.getElementById("postTitle").value;
      const content = document.getElementById("postContent").value;

      // Simulate sending data to the server
      console.log(`Title: ${title}, Content: ${content}`);
      // You would send this data to the server for processing and storage in a real implementation
   }

   // Call the function to display categories when the page loads
   displayCategories();

   // Add submit event listener to the post form
   postForm.addEventListener("submit", handlePostSubmission);
});
