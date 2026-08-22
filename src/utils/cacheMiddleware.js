import mime from 'mime/lite';

export const cache = (options = {}) => {
  const {
    maxAge = 180,
    includeLang = true,
    ignoreQueryParams = false
  } = options;

  return async (c, next) => {
    const url = new URL(c.req.url);
    const acceptLanguage = await c.t();

    const serveOriginalContent = async () => {
      // If no cache, generate response
      await next();

      // Don't cache/clone error responses
      if (!c.res.ok || c.res.status !== 200) {
        return c.res;
      }

      // Clone the response to read its body
      const originalResponse = c.res.clone();
      return await originalResponse.text();
    };

    if (c.env.USE_CACHE === "false") {
      return await serveOriginalContent();
    }

    // Generate cache key
    const cacheKey = `page:${url.pathname}@${acceptLanguage}`;
    const fileExtension = url.pathname.split('.').pop();
    const mimeType = mime.getType(fileExtension) || 'text/html';
    try {
      // Try to get cached content from KV
      const cachedContent = await c.env.CACHE_KV.get(cacheKey);

      if (cachedContent) {
        return new Response(cachedContent, {
          headers: {
            'Content-Type': mimeType,
            'X-KV-Cache-Status': 'HIT',
            'X-KV-Cache-Key': cacheKey,
            'X-Selected-Language': acceptLanguage,
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
      }

      const content = await serveOriginalContent();

      // If we don't get plain text back, then this is an error object
      // and we should return it as is.
      if (typeof content !== "string")
        return content;

      // Store in KV
      c.executionCtx.waitUntil(
        c.env.CACHE_KV.put(cacheKey, content.toString())
      );

      // Return the response
      return new Response(content, {
        headers: {
          'Content-Type': mimeType,
          'X-KV-Cache-Status': 'MISS',
          'X-Generated-Language': acceptLanguage,
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });

    } catch (error) {
      console.error('Cache error:', error);
      await next();
      return c.res;
    }
  };
};
