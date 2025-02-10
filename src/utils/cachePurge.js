import { getLangs } from "./localeMiddleware";

const langs = getLangs();
const WORKER_ID_KEY = "WORKERID_KEY";

export const cachePurgeSingle = async (c, galleryTableName) => {
  try {
    const promises = langs.map(async (lang) => {
      const path = (c.env.GALLERY_PATH !== "/" ? `${c.env.GALLERY_PATH}/`: "/");
      const cacheKey = `page:/${path}${galleryTableName}@${lang}`;
      console.log(cacheKey)
      return await c.env.CACHE_KV.delete(cacheKey);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Cache purge error:', error);
  }
};

export const cachePurgeHome = async (c) => {
  try {
    const promises = langs.map(async (lang) => {
      const path = (c.env.GALLERY_PATH !== "/" ? `${c.env.GALLERY_PATH}/`: "/");
      const cacheKey = `page:/${path}@${lang}`;
      return await c.env.CACHE_KV.delete(cacheKey);
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Cache purge error:', error);
  }
};

export const cachePurgeWorker = async (c, keyVal) => {
  try {
    if (c.env.CACHE_KV.get(WORKER_ID_KEY) === keyVal) {
      await cachePurgeHome(c);
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
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