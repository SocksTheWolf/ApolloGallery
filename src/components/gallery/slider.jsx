import { html, raw } from 'hono/html'

export const Slider = async (props) => {
    const c = props.c;
    const images = [];

    /*
    const images = [
        "/img/galleries/snow/91B4DC2E-852E-43A0-B635-599A058BF9EE_99f33e2ea4.jpg", 
        "/img/galleries/snow/AE4002CA-4BA2-4AA3-92F4-910BD5816433_84ad92f92d.jpg",
        "/img/galleries/snow/C9359454-0C33-4457-A552-9E78BF2C9B72_50249b8cfa.jpg"
    ];
    */
    
    const thumbnails = images;
    return html`
       <section role="article">
       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css" />
       <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
       <script src="/static/js/main-carousel.js"></script>
        <header>
          <h2>Pictures of the Day</h2>
        </header>
        <center>
        <div id="main-carousel" class="splide">
          <div class="splide__track">
            <ul class="splide__list">
            ${images.map((image) => (
              <li class="splide__slide">
                <img src={image} />
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
                <img src={image} />
              </li>
            ))}
          </ul>
        </footer>
        </center>
      </section>
    `;
};