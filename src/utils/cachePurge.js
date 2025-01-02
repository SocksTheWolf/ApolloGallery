import { getLangs } from "./localeMiddleware";

const langs = getLangs();

export const cachePurgeSingle = async (c, galleryTableName) => {
  try {
    const promises = langs.map(async (lang) => {
      const cacheKey = `page:/${galleryTableName}@${lang}`;
      // console.log("rmoved: " + cacheKey)
      return c.env.CACHE_KV.delete(cacheKey);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Cache purge error:', error);
  }
};

export const cachePurgeHome = async (c) => {
  try {
    const promises = langs.map(async (lang) => {
      const cacheKey = `page:/@${lang}`;
      // console.log("rmoved home: " + cacheKey)
      return c.env.CACHE_KV.delete(cacheKey);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Cache purge error:', error);
  }
};