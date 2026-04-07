document.addEventListener('DOMContentLoaded', function() {
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginToggle.addEventListener('click', function() {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginToggle.classList.add('active');
        registerToggle.classList.remove('active');
    });

    registerToggle.addEventListener('click', function() {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerToggle.classList.add('active');
        loginToggle.classList.remove('active');
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (username && password) {
            alert('登录成功！用户名: ' + username);
            // In a real application, you would send this to a server
        } else {
            alert('请输入用户名和密码。');
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                alert('注册成功！用户名: ' + username + ', 邮箱: ' + email);
                // In a real application, you would send this to a server
            } else {
                alert('两次输入的密码不一致。');
            }
        } else {
            alert('请填写所有注册信息。');
        }
    });
});
