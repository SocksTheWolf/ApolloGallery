import { cachePurgeHome, cachePurgeAll } from "./cachePurge";

export const WORKER_ID_KEY = "WORKERID_KEY";

const doesWorkerKeyMatch = (c, keyVal) => {
  try {
    return (c.env.CACHE_KV.get(WORKER_ID_KEY) === keyVal);
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
  if (keyVal === undefined || action === undefined)
    return c.text("Unauthorized", 401);

  let wasSuccess = false;
  if (doesWorkerKeyMatch(c, keyVal)) {
    switch (action) {
      case "slider":
        if (await sliderPurge(c))
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
  return c.json({handled: wasSuccess, action: action});
};