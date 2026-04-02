document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // In a real application, you would send this data to a server
        console.log('Registration data:', { username, email, password });
        alert('Registration successful! (See console for data)');
        window.location.href = 'index.html'; // Redirect to login page after registration
    });
});