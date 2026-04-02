document.getElementById('search-button').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value;
    if (searchTerm) {
        alert('您搜索的内容是: ' + searchTerm);
    } else {
        alert('请输入搜索内容');
    }
});
