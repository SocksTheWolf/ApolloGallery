import { getLangs } from "./localeMiddleware";
const cache = caches.default;
const langs = getLangs();

export const cachePurgeSingle = async (c, galleryTableName) => {
    const url = new URL(c.req.url);
    const homepage = url.origin;
    for (let lang of langs){
        const response = await cache.delete(`${homepage}/${galleryTableName}-${lang}`);
        // console.log("Purge_lang: " + lang + " Purged: " + response)
    }
  }

  export const cachePurgeHome = async (c) => {
    const url = new URL(c.req.url);
    const homepage = url.origin;

    for (let lang of langs){
        const response = await cache.delete(`${homepage}/-${lang}`);
        // console.log("Purge_lang: " + lang + " Purged: " + response)
    }
  }