import { cachePurgeHome, cachePurgeAll } from "./cachePurge";
import { publishFutureGalleries } from "./db";

// KV Key used for authenticating external cloudflare workers
export const WORKER_ID_KEY = "WORKERID_KEY";

const doesWorkerKeyMatch = async (c, keyVal) => {
  try {
    const KeyMatch = await c.env.CACHE_KV.get(WORKER_ID_KEY);
    return (KeyMatch === keyVal && KeyMatch !== null && KeyMatch !== "");
  } catch(err) {
    console.warn(`Key Match Check failed: ${err}`);
  }
  return false;
}

export const workerSliderPurge = async (c) => {
  try {
    await cachePurgeHome(c);
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const workerPurgeAll = async (c) => {
  try {
    await cachePurgeAll(c);
    return true;
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const workerPublishNow = async (c) => {
  try {
    const numUpdates = await publishFutureGalleries(c);
    // If we made changes, purge the homepage
    if (numUpdates > 0) {
      await cachePurgeHome(c);
    }
    return numUpdates;
  } catch(err) {
    console.error(err);
  }
  return -1;
};

export const workerRouter = async (c, keyVal, action) => {
  let wasSuccess = false;
  let details = "";

  if (keyVal === undefined || keyVal === null || action === undefined || action === null)
    return c.text("Unauthorized", 401);

  const matchSuccess = await doesWorkerKeyMatch(c, keyVal);
  if (matchSuccess) {
    switch (action) {
      case "slider":
        if (await workerSliderPurge(c))
          wasSuccess = true;
      break;
      case "purgeAll":
        if (await workerPurgeAll(c))
          wasSuccess = true;
      break;
      case "publishGalleries":
        details = await workerPublishNow(c);
        wasSuccess = details >= 0;
      break;
      default:
        return c.text("Unauthorized", 401);
      break;
    }
  }
  return c.json({handled: wasSuccess, action: action, output: details});
};