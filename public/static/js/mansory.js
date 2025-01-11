var grid = document.querySelector('.gallery-grid');
var iso = new Isotope(grid, {
    itemSelector: '.gallery-grid-item',
    percentPosition: true,
    masonry: {
        columnWidth: '.gallery-grid-sizer'
    }
});

imagesLoaded(grid).on('progress', function () {
    // layout Isotope after each image loads
    iso.layout();
});