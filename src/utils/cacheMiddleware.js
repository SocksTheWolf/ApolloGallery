import { env } from 'hono/adapter';

// Cache middleware factory function
export const cache = (options = {}) => {
  const {
    maxAge = 180,
    includeLang = true,
    ignoreQueryParams = false
  } = options;

  return async (c, next) => {
    const cache = caches.default;
    const url = new URL(c.req.url);

    // Handle cache purge requests
    if (url.pathname === '/purge-cache') {
      return handleCachePurge(c);
    }

    // Generate cache key
    let cacheKeyUrl = ignoreQueryParams ? 
      `${url.origin}${url.pathname}` : 
      c.req.url;

    const acceptLanguage = c.t();
    
    const cacheKey = new Request(
      `${cacheKeyUrl}${includeLang ? `-${acceptLanguage}` : ''}`
    );

    try {
      // Check for cached response
      const cachedResponse = await cache.match(cacheKey);
      
      if (cachedResponse) {
        // Return cached response with additional headers
        return new Response(cachedResponse.body, {
          status: cachedResponse.status,
          headers: {
            ...Object.fromEntries(cachedResponse.headers),
            'X-Cache-Language': acceptLanguage,
            'X-Cache-Status': 'HIT'
          }
        });
      }

      // Generate new response
      await next();
      
        // Create a new response with the desired headers
        const response = new Response(c.res.body, {
            status: c.res.status,
            headers: {
              ...Object.fromEntries(c.res.headers),
              'Cache-Control': `public, max-age=${maxAge}`,
              'X-Generated-Language': acceptLanguage,
              'X-Cache-Status': 'MISS'
            }
          });
    
          // Store in cache
          const bindings = env(c);
          if (bindings.CACHE_DEBUG) {
            console.log(`Caching response for: ${cacheKey.url}`);
          }
    
          cctx.waitUntil(cache.put(cacheKey, response.clone()));
    
          return response;
        } catch (error) {
          return c.text(`Cache error: ${error.message}`, 500);
        }
      };
    };

// Helper function to handle cache purge requests
async function handleCachePurge(c) {
  const cache = caches.default;
  const url = new URL(c.req.url);
  
  try {
    const targetUrl = url.searchParams.get('url');
    const language = url.searchParams.get('lang') || 'en-US';

    if (!targetUrl) {
      return c.text('Missing URL parameter', 400);
    }

    const cacheKey = new Request(`${targetUrl}-${language}`);
    await cache.delete(cacheKey);

    return c.text(`Cache purged for ${targetUrl} (${language})`, 200);
  } catch (error) {
    return c.text(`Purge error: ${error.message}`, 500);
  }
}