import LoginRegister from './LoginRegister.js';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const loginLink = document.querySelector('.login-link');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer');
    const reactRoot = document.getElementById('root');

    // Search functionality
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value;
        if (searchTerm) {
            alert('您搜索的内容是: ' + searchTerm);
        } else {
            alert('请输入搜索内容');
        }
    });

    // Login/Register functionality
    let loginRegisterMounted = false;
    loginLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!loginRegisterMounted) {
            mainContent.style.display = 'none';
            footer.style.display = 'none';
            reactRoot.style.display = 'flex'; // Use flex to center content based on LoginRegister styles

            const root = ReactDOM.createRoot(reactRoot);
            root.render(React.createElement(LoginRegister, null));
            loginRegisterMounted = true;
        } else {
            // Toggle back to main content
            mainContent.style.display = '';
            footer.style.display = '';
            reactRoot.style.display = 'none';
            // Optionally unmount the component if needed, but hiding is simpler for now
        }
    });

    // Initially hide the react root
    reactRoot.style.display = 'none';
});
