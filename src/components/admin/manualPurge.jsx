import { cachePurgeHome, cachePurgeSingle } from "../../utils/cachePurge";

export const manualPurge = async (c) => {
  const galeryTableName = c.req.param("galeryTableName");
  await cachePurgeHome(c);
  await cachePurgeSingle(c, galeryTableName);

  return c.html(`
      <button
         class="btn btn-link"
         hx-post=${galeryTableName + "/purge"}
         hx-target="this"
         hx-swap="outerHTML"
         >
        <i className="bi bi-arrow-clockwise me-2"></i>
        ${c.t("purged")}
       </button>
      `);
};
