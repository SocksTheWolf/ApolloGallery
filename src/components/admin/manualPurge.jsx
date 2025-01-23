import { cachePurgeHome, cachePurgeSingle } from "../../utils/cachePurge";

export const manualPurge = async (c) => {
  const galleryTableName = c.req.param("galleryTableName");
  await cachePurgeHome(c);
  await cachePurgeSingle(c, galleryTableName);

  return c.html(`
      <button
         class="btn btn-link"
         hx-post=${galleryTableName + "/purge"}
         hx-target="this"
         hx-swap="outerHTML"
         >
        <i class="bi bi-arrow-clockwise me-2"></i>
        ${c.t("purged")} ${galleryTableName}
       </button>
      `);
};
