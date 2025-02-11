var posts = document.querySelectorAll('.edit-item img');
imagesLoaded( posts, function() {
    var grid = document.querySelector('.edit-grid');
    var msnry = new Masonry( grid, {
    // options...
    itemSelector: '.edit-item',
    columnWidth: 300
    });
});