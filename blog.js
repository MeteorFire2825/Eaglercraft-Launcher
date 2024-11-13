// blog.js

// Get references to the blog post form and posts list
const postForm = document.getElementById('post-form');
const postTitleInput = document.getElementById('post-title');
const postContentInput = document.getElementById('post-content');
const postsList = document.getElementById('posts-list');
const newPostForm = document.getElementById('new-post-form');
const loginPrompt = document.getElementById('login-prompt');

// Check if the user is logged in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is logged in, show post form
        console.log("Logged in as:", user.email);
        newPostForm.style.display = 'block'; // Show the post form
        loginPrompt.style.display = 'none'; // Hide the login prompt
    } else {
        // User is not logged in, hide post form
        console.log("User is not logged in.");
        newPostForm.style.display = 'none'; // Hide the post form
        loginPrompt.style.display = 'block'; // Show the login prompt
    }
});

// Function to fetch and display blog posts
function loadBlogPosts() {
    db.collection("posts")  // Reference to the 'posts' collection in Firestore
        .orderBy("timestamp", "desc")  // Order posts by timestamp in descending order
        .get()
        .then((querySnapshot) => {
            postsList.innerHTML = '';  // Clear the current list
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>Posted by: ${post.author} on ${new Date(post.timestamp.seconds * 1000).toLocaleString()}</small>
                `;
                postsList.appendChild(postElement);
            });
        })
        .catch((error) => {
            console.error("Error getting posts: ", error);
        });
}

// Function to submit a new post
postForm.addEventListener('submit', (e) => {
    e.preventDefault();  // Prevent the default form submission

    const title = postTitleInput.value;
    const content = postContentInput.value;
    const user = firebase.auth().currentUser;

    if (user) {
        // Add new post to Firestore
        db.collection("posts").add({
            title: title,
            content: content,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),  // Automatically add a timestamp
            author: user.email  // Store the author's email (only if logged in)
        })
        .then(() => {
            postTitleInput.value = '';  // Clear the form
            postContentInput.value = '';
            loadBlogPosts();  // Reload the posts
        })
        .catch((error) => {
            console.error("Error adding post: ", error);
        });
    } else {
        alert("Please log in to submit a post.");
    }
});

// Load the blog posts when the page is loaded
window.onload = loadBlogPosts;
