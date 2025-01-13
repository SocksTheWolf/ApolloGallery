import PhotoSwipeLightbox from "/static/js/photoswipe-lightbox.esm.min.js";
const lightbox = new PhotoSwipeLightbox({
  gallery: "#masonry-container",
  children: "a",
  pswpModule: () => import("/static/js/photoswipe.esm.min.js"),
});
lightbox.on("uiRegister", function () {
  lightbox.pswp.ui.registerElement({
    name: "download-button",
    order: 8,
    isButton: true,
    tagName: "a",

    // SVG with outline
    html: {
      isCustomSVG: true,
      inner:
        '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1ZM23 23H9v2h14Z" id="pswp__icn-download"/>',
      outlineID: "pswp__icn-download",
    },

    onInit: (el, pswp) => {
      el.setAttribute("download", "");
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener");

      pswp.on("change", () => {
        const specialUrl = pswp.currSlide.data.src;
        el.href = specialUrl.substring(specialUrl.indexOf("img/"));
      });
    },
  });
});
lightbox.init();