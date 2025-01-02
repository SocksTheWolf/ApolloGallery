export const cache = () => {
  return async (c, next) => {
    const url = new URL(c.req.url);
    const acceptLanguage = await c.t();

    // Generate cache key
    const cacheKey = `page:${url.pathname}@${acceptLanguage}`;
    console.log("ck: " + cacheKey)
    try {
      // Try to get cached content from KV
      const cachedContent = await c.env.CACHE_KV.get(cacheKey);

      if (cachedContent) {
        return new Response(cachedContent, {
          headers: {
            'Content-Type': 'text/html',
            'X-KV-Cache-Status': 'HIT',
            'X-KV-Cache-Key': cacheKey,
            'X-Selected-Language': acceptLanguage
          }
        });
      }

      // If no cache, generate response
      await next();

      // Clone the response to read its body
      const originalResponse = c.res.clone();
      
      // Don't cache error responses
      if (!originalResponse.ok || originalResponse.status !== 200) {
        return originalResponse;
      }

      const content = await originalResponse.text();

      // Store in KV
      c.executionCtx.waitUntil(
        c.env.CACHE_KV.put(cacheKey, content)
      );

      // Return the response
      return new Response(content, {
        headers: {
          'Content-Type': 'text/html',
          'X-KV-Cache-Status': 'MISS',
          'X-Generated-Language': acceptLanguage
        }
      });

    } catch (error) {
      console.error('Cache error:', error);
      await next();
      return c.res;
    }
  };
};