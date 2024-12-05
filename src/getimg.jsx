export async function handleGetImage(c) {
  try {
    const path = c.req.path;
    const imgPath = path.slice(5);

    if (!imgPath) {
      return c.text("Invalid Image Path", 400);
    }

    const object = await c.env.R2.get(imgPath);

    if (object === null) {
      return c.text("Image Not Found", 404);
    }

    const headers = new Headers();

    object.writeHttpMetadata(headers);

    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    headers.set("ETag", object.httpEtag);

    return new Response(object.body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    return c.text("Internal Server Error", 500);
  }
}
