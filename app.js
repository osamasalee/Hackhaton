 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyC0rEFNVNr_coDQHtRFWQYpz8Vob57U1_Y",
   authDomain: "blog-website-1c3e4.firebaseapp.com",
   projectId: "blog-website-1c3e4",
   storageBucket: "blog-website-1c3e4.appspot.com",
   messagingSenderId: "503311543554",
   appId: "1:503311543554:web:2ded95e14cdf8be5c5e61b"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);




document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const blogForm = document.getElementById('blog-form');
    const toggleLinkText = document.getElementById('toggle-link-text');
    const authContainer = document.getElementById('auth-container');
    const blogContainer = document.getElementById('blog-container');
    const usernameSpan = document.getElementById('username');
    const logoutBtn = document.getElementById('logout-btn');
    const postsList = document.getElementById('posts-list');

    let isLoggedIn = false;

    const switchToSignup = () => {
        document.getElementById('form-title').textContent = 'Sign Up';
        document.getElementById('auth-btn').textContent = 'Sign Up';
        toggleLinkText.textContent = 'Have an account? Login';
        toggleLinkText.onclick = switchToLogin;
    };

    const switchToLogin = () => {
        document.getElementById('form-title').textContent = 'Login';
        document.getElementById('auth-btn').textContent = 'Login';
        toggleLinkText.textContent = 'Don\'t have an account? Sign up';
        toggleLinkText.onclick = switchToSignup;
    };

    const handleAuth = (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (document.getElementById('form-title').textContent === 'Login') {
            const storedPassword = localStorage.getItem(email);
            if (storedPassword && storedPassword === password) {
                isLoggedIn = true;
                localStorage.setItem('loggedInUser', email);
                showBlogContainer();
            } else {
                alert('Invalid email or password');
            }
        } else {
            localStorage.setItem(email, password);
            alert('Sign up successful! You can now log in.');
            switchToLogin();
        }
    };

    const handleBlogSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        posts.push({ title, content });
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        blogForm.reset();
    };

    const handleLogout = () => {
        isLoggedIn = false;
        localStorage.removeItem('loggedInUser');
        authContainer.style.display = 'block';
        blogContainer.style.display = 'none';
    };

    const showBlogContainer = () => {
        authContainer.style.display = 'none';
        blogContainer.style.display = 'block';
        usernameSpan.textContent = localStorage.getItem('loggedInUser');
        displayPosts();
    };

    const displayPosts = () => {
        const posts = JSON.parse(localStorage.getItem('posts') || '[]');
        postsList.innerHTML = posts.map(post => `<li><strong>${post.title}</strong><p>${post.content}</p></li>`).join('');
    };

    authForm.addEventListener('submit', handleAuth);
    blogForm.addEventListener('submit', handleBlogSubmit);
    logoutBtn.addEventListener('click', handleLogout);

    // Initial setup
    if (localStorage.getItem('loggedInUser')) {
        showBlogContainer();
    }
});
