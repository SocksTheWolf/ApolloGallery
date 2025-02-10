import { html } from 'hono/html'
import { getSliderImages } from '../../utils/db';

export const Slider = async (props) => {
    const c = props.c;
    const images = await getSliderImages(c, 5);
    if (images === null) {
        console.error("Could not get slider images, failed to poll");
        return "";
    }    
    const thumbnails = images;
    return html`
       <section role="article">
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" />
       <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
       <script src="/static/js/main-carousel.js"></script>
        <header>
          <h2><center>Featured Pictures of the Day!</center></h2>
        </header>
        <center>
        <div id="main-carousel" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
            ${images.map((image) => (
              <li class="splide__slide">
                <img src={image.url} />
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
                <img src={image.thumb} />
              </li>
            ))}
          </ul>
        </footer>
        </center>
      </section>
    `;
};