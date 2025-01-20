const CACHE_NAME_SIGHTS = "sights-cache-v1";
const CACHE_NAME_CATEGORIES = "categories-cache-v1";

self.addEventListener("install", (event) => {
    console.log("Service Worker installiert");
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME_SIGHTS && cacheName !== CACHE_NAME_CATEGORIES) {
                        console.log("Lösche alten Cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

self.addEventListener("fetch", (event) => {
    const requestUrl = event.request.url;

    if (requestUrl.endsWith("/sights/allSights")) {
        // Caching für "allSights"
        event.respondWith(
            caches.open(CACHE_NAME_SIGHTS).then((cache) =>
                fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => cache.match(event.request))
            )
        );
    } else if (requestUrl.endsWith("/categories/allCategories")) {
        // Caching für "allCategories"
        event.respondWith(
            caches.open(CACHE_NAME_CATEGORIES).then((cache) =>
                fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                    .catch(() => cache.match(event.request))
            )
        );
    }
});




