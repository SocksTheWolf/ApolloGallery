var grid = document.querySelector('.edit-grid');
var msnry = new Masonry( grid, {
    itemSelector: '.edit-item',
    columnWidth: 300
});

const imgLoaded = imagesLoaded(grid);
function updateLayout() {
    console.log("layout updated");
    msnry.layout();
}

imgLoaded.on('progress', function(){
    updateLayout();
});

imgLoaded.on('done', function(){
    updateLayout();
});

imgLoaded.on('always', function(){
    updateLayout();
});

document.getElementById("images-in-gallery").addEventListener("click", (ev) => {
    // pico has a css transition delay that plays out, so this will look odd if we
    // try to apply it immediately.
    setTimeout(updateLayout, 185);
});