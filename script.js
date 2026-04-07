document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === '' || password === '') {
        errorMessage.textContent = 'Please enter both username and password.';
    } else {
        errorMessage.textContent = '';
        // Here you would typically send the username and password to a server for authentication.
        // For this example, we'll just log them to the console.
        console.log('Username:', username);
        console.log('Password:', password);
        alert('Login attempt with Username: ' + username + ' and Password: ' + password);

        // In a real application, if login is successful, you would redirect the user
        // window.location.href = 'dashboard.html';
    }
});