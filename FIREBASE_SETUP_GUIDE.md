# Firebase Setup Guide for Studio Jatayu

This guide will help you set up Firebase for authentication and database functionality in your Angular application.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click on "Add project" or "Create a project"
3. Enter a project name (e.g., "Studio Jatayu")
4. Choose whether to enable Google Analytics (recommended)
5. Accept the terms and click "Create project"
6. Wait for the project to be created and click "Continue"

## 2. Register Your Web Application

1. In the Firebase Console, click on the web icon (</>) to add a web app
2. Enter a nickname for your app (e.g., "Studio Jatayu Web")
3. Optionally enable Firebase Hosting
4. Click "Register app"
5. Firebase will generate a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

6. Copy this configuration and replace the placeholder values in `src/app/config/firebase.config.ts`

## 3. Enable Authentication Methods

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click on "Get started" or "Sign-in method"
3. Enable the authentication methods you want to use:
   - Email/Password
   - Google
   - Facebook (optional)
   - Twitter (optional)
   - GitHub (optional)
4. For each method, follow the setup instructions provided by Firebase

## 4. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose a starting mode:
   - Production mode (recommended for production apps)
   - Test mode (good for development, but less secure)
4. Choose a location for your database (closer to your users is better)
5. Click "Enable"

## 5. Set Up Storage

1. In the Firebase Console, go to "Storage" in the left sidebar
2. Click "Get started"
3. Choose a starting mode (similar to Firestore)
4. Choose a location for your storage
5. Click "Done"

## 6. Set Up Security Rules

### Firestore Rules

1. In the Firebase Console, go to "Firestore Database" > "Rules"
2. Set up appropriate security rules. Here's a basic example:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow anyone to read projects
    match /projects/{projectId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Allow authenticated users to read and write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
      allow read: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules

1. In the Firebase Console, go to "Storage" > "Rules"
2. Set up appropriate security rules. Here's a basic example:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to read and write their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow anyone to read project images
    match /projects/{projectId}/images/{imageId} {
      allow read: if true;
      allow write: if request.auth != null && firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 7. Create Admin Users

To create admin users, you'll need to manually update their role in Firestore:

1. In the Firebase Console, go to "Firestore Database"
2. Navigate to the "users" collection
3. Find the user you want to make an admin
4. Edit the document and set the "role" field to "admin"

## 8. Testing Your Firebase Integration

1. Run your Angular application
2. Try to register a new user
3. Try to log in with the registered user
4. Check the Firebase Console to verify that the user was created
5. Try to access protected routes based on user roles

## Troubleshooting

- **Authentication Issues**: Check the Firebase Console's Authentication section for error logs
- **Database Access Issues**: Verify your Firestore security rules
- **Storage Access Issues**: Verify your Storage security rules
- **CORS Issues**: Make sure your Firebase project settings allow requests from your domain

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [AngularFire Documentation](https://github.com/angular/angularfire)
- [Firebase Security Rules](https://firebase.google.com/docs/rules) 
