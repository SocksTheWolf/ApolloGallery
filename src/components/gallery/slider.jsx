import { html } from 'hono/html'
import { getSliderImages } from '../../utils/db';
import { getImageWithTransforms } from '../../utils/galleryPath';
import clamp from 'just-clamp';

export const Slider = async (props) => {
    const c = props.c;
    const maxImages = props.maxImages || 5;
    const images = await getSliderImages(c, maxImages);
    if (images === null) {
        console.error("Could not get slider images, failed to poll");
        return "";
    }
    const thumbnails = images;

    // Creates alt text for the image fields
    const writeAltText = (albumName, thumb) => {
      const baseText = `image from the ${albumName} album!`;
      if (thumb)
        return `Thumbnail of an ${baseText}`;
      else
        return `An ${baseText}`;
    };
    // Determines the fetch priority of the images
    // in the slider.
    var fetchCounter = 0;
    const highPriorityCutoff = clamp(maxImages / 2, 1, 5);
    const getFetchPriority = () => {
      if (fetchCounter++ < highPriorityCutoff) {
        return "high";
      }
      return "low";
    };
    return html`
       <section role="article">
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" />
       <script type="module" src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
       <script type="module" src="/static/js/main-carousel.js"></script>
        <header>
          <h2><center>${props.title}</center></h2>
        </header>
        <center>
        <div id="main-carousel" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
            ${images.map((image) => (
              <li class="splide__slide">
                <img fetchPriority={getFetchPriority()} src={getImageWithTransforms(c, image.url, "slider")} alt={writeAltText(image.name, false)} />
                <div>From the <a href={image.link}>{image.name} album</a></div>
              </li>
            ))}
            </ul>
          </div>
        </div>
        <footer>
          <hr />
          <ul id="thumbnails" class="thumbnails">
            ${thumbnails.map((image) => (
              <li class="thumbnail">
                <img width="70" height="70" fetchPriority='high' src={getImageWithTransforms(c, image.thumb, "slider-thumb")} alt={writeAltText(image.name, true)} />
              </li>
            ))}
          </ul>
        </footer>
        </center>
      </section>
    `;
};