import { getGalleryPath } from "./galleryPath";
import { getLangs } from "./localeMiddleware";
import { WORKER_ID_KEY } from "./workerHelpers";

const langs = getLangs();

const cachePurgeInternal = async (c, page) => {
  try {
    const promises = langs.map(async (lang) => {
      const cacheKeyForLang = `page:${page}@${lang}`;
      return await c.env.CACHE_KV.delete(cacheKeyForLang);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Cache purge error:', error);
  }
};

export const cachePurgeSingle = async (c, galleryTableName) => {
  await cachePurgeInternal(c, `${getGalleryPath(c)}${galleryTableName}`);
};

export const cachePurgeHome = async (c) => {
  await cachePurgeInternal(c, getGalleryPath(c));
};

export const cachePurgeSitemap = async (c) => {
  await cachePurgeInternal(c, `${getGalleryPath(c)}sitemap.xml`);
};

export const cachePurgeSitemapAndHome = async (c) => {
  await Promise.all([
    cachePurgeHome(c),
    cachePurgeSitemap(c)
  ]);
};

// function to purge all cache keys returning from cache.list()
export const cachePurgeAll = async (c) => {
  try {
    const keys = await c.env.CACHE_KV.list();
    if (!keys.keys.length) {
      return ["No keys found in cache"];
    }

    const removedKeys = [];
    const promises = keys.keys.map(async (key) => {
      // Skip any keys that are "protected"
      if (key.name !== WORKER_ID_KEY) {
        await c.env.CACHE_KV.delete(key.name);
        removedKeys.push(key.name);
        return key.name;
      }
    });

    await Promise.all(promises);
    return removedKeys;

  } catch (error) {
    console.error('Cache purge error:', error);
    return [`Error purging cache: ${error.message}`];
  }
};