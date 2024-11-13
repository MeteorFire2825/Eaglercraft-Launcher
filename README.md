# Eaglercraft-Launcher
Eaglercraft Launcher for the community
a
- **`/assets`**: Contains stylesheets, images, and other static assets.
- **`/firebase`**: Contains the Firebase configuration and initialization script.
- **`/js`**: Contains the JavaScript logic for the blog and Firebase interactions.
- **`index.html`**: The homepage of the website.
- **`blog.html`**: The blog page where posts are displayed, and new posts are submitted.
- **`README.md`**: This file, which provides documentation for the project.

## Prerequisites

Before running this project, you need to set up a Firebase project and initialize Firebase Authentication and Firestore.

### Steps to Set Up Firebase:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Firebase project.
3. Enable Firebase Authentication (Google Sign-In):
   - Navigate to the **Authentication** section and enable **Google** sign-in method.
4. Enable Firestore:
   - Go to the **Firestore Database** section and create a Firestore database.
5. Set up Firestore security rules (see below).
6. Get your Firebase project configuration (API keys, project ID, etc.), and add it to the `firebase-config.js` file.

### Firebase Security Rules:

Ensure your Firestore security rules allow authenticated users to create posts and everyone to read them. Here is an example rule:

```plaintext
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Allow read access to all users
    match /posts/{postId} {
      allow read: if true;  // Anyone can read the posts
      allow create: if request.auth != null;  // Only authenticated users can create posts
    }
  }
}
