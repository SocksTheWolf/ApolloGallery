export const cache = () => {
  return async (c, next) => {
    const maxAge = c.env.MAX_AGE
    const includeLang = c.env.LANG_VARY
    const cache = caches.default;
    const url = new URL(c.req.url);
    const acceptLanguage = c.t();

    let cacheKeyUrl = `${url.origin}${url.pathname}`

    const cacheKey = new Request(
      `${cacheKeyUrl}${includeLang ? `-${acceptLanguage}` : ''}`
    );

    try {
      const cachedResponse = await cache.match(cacheKey);

      if (cachedResponse) {
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          headers: {
            ...Object.fromEntries(cachedResponse.headers),
            'X-Cache-Status': 'HIT'
          }
        });
      }

      await next();

      const response = new Response(c.res.clone().body, {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=' + maxAge,
          'X-Generated-Language': acceptLanguage,
          'X-Cache-Status': 'MISS'
        }
      });

      c.env.waitUntil(cache.put(cacheKey, response));

    } catch (error) {
      return c.text(`Cache error: ${error.message}`, 500);
    }
  };
};
