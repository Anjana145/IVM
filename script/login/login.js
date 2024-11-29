// Default credentials
const defaultUsername = 'anjana';
const defaultPassword = 'admin';

// Handle form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get values entered by the user
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if credentials are correct
    if (username === defaultUsername && password === defaultPassword) {
        // Redirect to index.html if credentials are correct
        window.location.href = '../index.html';
    } else {
        // Show alert if credentials are incorrect
        alert('Invalid username or password');
    }
});
