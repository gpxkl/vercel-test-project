// This script is for Lucide Icons to render correctly.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error('Lucide library not loaded. Make sure the CDN link is correct.');
    }

    const navTabs = document.querySelectorAll('.nav-tabs .lucide-icon, .nav-tabs .nav-text');
    const content = document.querySelector('.content');
    const chatList = document.querySelector('.chat-list');
    const feed = document.querySelector('.feed');

    // Initially hide chat-list and show feed
    if (chatList) chatList.style.display = 'none';
    if (content) content.style.display = 'block';

    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all nav items
            navTabs.forEach(item => {
                item.classList.remove('active');
            });

            // Add active class to the clicked item
            tab.classList.add('active');
            if (tab.nextElementSibling && tab.nextElementSibling.classList.contains('nav-text')) {
                tab.nextElementSibling.classList.add('active');
            } else if (tab.previousElementSibling && tab.previousElementSibling.classList.contains('lucide-icon')) {
                tab.previousElementSibling.classList.add('active');
            }


            // Handle content display based on clicked tab
            if (tab.getAttribute('data-lucide') === 'message-circle') {
                if (chatList) chatList.style.display = 'block';
                if (content) content.style.display = 'none';
            } else if (tab.getAttribute('data-lucide') === 'rss' || tab.classList.contains('nav-text')) {
                if (chatList) chatList.style.display = 'none';
                if (content) content.style.display = 'block';
            }
        });
    });

    // Handle likes
    const likeButtons = document.querySelectorAll('.post-actions .likes');
    likeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let currentLikes = parseInt(button.textContent.replace('❤️ ', ''));
            currentLikes++;
            button.textContent = `❤️ ${currentLikes}`;
        });
    });

    // Handle chat item clicks
    const chatItems = document.querySelectorAll('.chat-item');
    chatItems.forEach(item => {
        item.addEventListener('click', () => {
            const userName = item.querySelector('.user-name').textContent;
            alert(`You clicked on chat with ${userName}`);
        });
    });
});

