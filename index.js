 document.addEventListener("DOMContentLoaded", function () {
   const showRandomButton = document.getElementById("show-random-button");
   const searchButton = document.getElementById("search-button");


    showRandomButton.addEventListener("click", function () {
      fetch("https://dog.ceo/api/breeds/image/random/5")  //Fetching 5 random dog images
        .then(function (response) {
          return response.json();

        })
        .then(function (data) {
          const imageUrls = data.message;  //Array of image Urls
          displayDogImages(imageUrls);   //Display multiple dog images
        });
        
    });

    searchButton.addEventListener("click", function () {
      const breed = document.getElementById("breed-search").value.trim().toLowerCase();
      if (breed) {
        fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)  //Fetching 5 random dog images for the specified breed
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.status === "success") {
            const imageUrls = data.message;  //Array of image Urls
            displayDogImages(imageUrls);  //Display multiple dog images
            
          } else {
            alert ("Breed not found!");
          }
        })
        .catch(function (error) {
          console.error("Error fetching breed:", error);
        });
      }
    });
  
     //Function to display dog image,likes section and comments section
     function displayDogImages(imageUrls) {
     const imageContainer = document.getElementById("image-container");

      //Using map method to map over the array of image Urls to generate HTML for each image
       const imagesHTML = imageUrls.map(imageUrl => `
       <div class="image-item"> 
      <img src="${imageUrl}" alt="Random dog image">
      <div class="likes-section">
          <span class="like-count">0 likes</span>
          <button class="like-button">♥</button>
          <div class="comments-section">
          <ul class="comments-list"></ul>
              <form class="comment-form">
                  <input class="comment-input" type="text" name="comment" placeholder="Add a comment...">
                  <button class="comment-button" type="'submit">Post</button>
              </form>
          </div>
      </div>
    </div>
    `).join("");    //Joins the array of HTML strings to a single string

    //Set HTML OF all images to have innerHTML of the image container
    imageContainer.innerHTML = imagesHTML;

    //Add event listener for each image's like button and comment form
    const likeButtons = document.querySelectorAll(".like-button");
    const commentForms = document.querySelectorAll(".comment-form"); 
    likeButtons.forEach(button => {
      button.addEventListener("click", function () {
        incrementLikes(button);
      });
    });

    commentForms.forEach(form=> {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        postComment(form);
      });
    });
   
 }

   function incrementLikes(likeButton) {
    const likeCount = likeButton.previousElementSibling;  //Selects the span element before the like button
    let likes = parseInt(likeCount.textContent);
    likes++;
    likeCount.textContent = `${likes} likes`;
  }
   function postComment(form) {
    const commentInput = form.querySelector(".comment-input");
    const comment = commentInput.value.trim();
    if (comment) {
      const commentsList = form.parentElement.querySelector(".comments-list");  //Selects the <ul> element within the comments-section
      const newComment = document.createElement("li");
      newComment.textContent = comment;
      commentsList.appendChild(newComment);
      commentInput.value = ""; //Clears the input field
    }
   }
 
});

  
