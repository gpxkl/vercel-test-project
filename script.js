document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // Basic validation (replace with actual authentication logic)
    if (username === 'user' && password === 'password') {
        messageDiv.style.color = 'green';
        messageDiv.textContent = 'Login successful!';
        // Redirect or perform further actions here
        // window.location.href = '/dashboard';
    } else {
        messageDiv.style.color = 'red';
        messageDiv.textContent = 'Invalid username or password.';
    }
});
