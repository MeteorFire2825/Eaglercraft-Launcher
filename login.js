// login.js
const loginForm = document.getElementById('login-form');
const loginEmailInput = document.getElementById('login-email');
const loginPasswordInput = document.getElementById('login-password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;

    // Sign in the user using Firebase Authentication
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Successfully logged in
            const user = userCredential.user;
            console.log("User logged in:", user);

            // Redirect to the home page or dashboard after successful login
            window.location.href = "index.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });
});
