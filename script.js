// This script is for Lucide Icons to render correctly.
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error('Lucide library not loaded. Make sure the CDN link is correct.');
    }
});
