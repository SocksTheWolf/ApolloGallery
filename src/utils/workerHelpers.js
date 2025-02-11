import { cachePurgeHome, cachePurgeAll } from "./cachePurge";

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

export const workerRouter = async (c, keyVal, action) => {
  if (keyVal === undefined || keyVal === null || action === undefined || action === null)
    return c.text("Unauthorized", 401);

  let wasSuccess = false;
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
      default:
        return c.text("Unauthorized", 401);
      break;
    }
  }
  return c.json({handled: wasSuccess, action: action, matched: matchSuccess});
};