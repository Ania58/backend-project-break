import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR8PGMZv6Vcw_eMuMFqabIYQeh8JXhmQQ",
  authDomain: "backend-project-firebase-auth.firebaseapp.com",
  projectId: "backend-project-firebase-auth",
  storageBucket: "backend-project-firebase-auth.appspot.com",
  messagingSenderId: "662975905899",
  appId: "1:662975905899:web:4c7f9b3a9f3d885ad5b12e",
  measurementId: "G-FZHSF4TGBP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const login = async () => {
  const message = document.getElementById('message'); 
  message.textContent = ''; // clean any previous messages

  try {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      message.textContent = 'Email and password are required';
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const idToken = await userCredential.user.getIdToken();

    // sends ID token to the server
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = '/dashboard';
    } else {
      message.textContent = 'Login failed: ' + data.error;
    }
  } catch (error) {
    console.error(error); 
  if (error.code === 'auth/invalid-login-credentials' || 
      error.code === 'auth/wrong-password' || 
      error.code === 'auth/user-not-found') {
    message.textContent = 'Incorrect email or password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      message.textContent = 'The email address is not valid. Please check your input.';
    } else if (error.code === 'auth/too-many-requests') {
      message.textContent = 'Too many login attempts. Please try again later.';
    } else {
      message.textContent = 'An unexpected error occurred. Please try again later.';
    }
  }
}

document.getElementById('loginButton').addEventListener('click', login);
