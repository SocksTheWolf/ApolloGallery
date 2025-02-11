/*
var posts = document.querySelectorAll('.edit-item img');
imagesLoaded( posts, function() {
    var grid = document.querySelector('.edit-grid');
    var msnry = new Masonry( grid, {
        // options...
        itemSelector: '.edit-item',
        columnWidth: 300
    });
});
/*/
var grid = document.querySelector('.edit-grid');
var msnry = new Masonry( grid, {
    itemSelector: '.edit-item',
    columnWidth: 300
});

imagesLoaded(grid).on('progress', function(){
    msnry.layout();
});
//*/