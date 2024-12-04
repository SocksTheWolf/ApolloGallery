console.log("hello from new galery js");

import { initLatinise } from "./latinise.js";

initLatinise();

const galeryNameInput = document.getElementById("galleryName");
const galeryTableNameInput = document.getElementById("galleryTableName");
const autoupdateFields = (e) => {
  const orgNameValue = e.target.value;
  const simpleName = orgNameValue
    .toString()
    .toLowerCase()
    .latinise()
    .replace(/[*#%&{}\\<>?\/\s$!'"':@+`|=*]+/g, '_')
    .replace(/[^\w-]/g, '')  // Remove any remaining non-word characters
    .replace(/_+/g, '_')     // Replace multiple consecutive underscores with a single underscore
    .replace(/_+$/g, '');    // Trim trailing underscores

  galeryTableNameInput.value = simpleName;
};

galeryNameInput.addEventListener("blur", autoupdateFields);
