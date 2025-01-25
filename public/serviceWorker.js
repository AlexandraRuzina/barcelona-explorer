const CACHE_NAME_SIGHTS = "sights-cache-v1";
const CACHE_NAME_CATEGORIES = "categories-cache-v1";
const VISITED_SPOTS = "visited-spots-cache-v1";

// Installation des Service Workers
self.addEventListener("install", (event) => {
    console.log("Service Worker installiert");
    self.skipWaiting(); // Aktiviert den SW sofort, ohne zu warten
});

// Aktivieren und Aufräumen alter Caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (![CACHE_NAME_SIGHTS, CACHE_NAME_CATEGORIES, VISITED_SPOTS].includes(cacheName)) {
                        console.log("Lösche alten Cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
    console.log("Service Worker aktiviert");
});

// Fetch-Ereignisse abfangen
self.addEventListener("fetch", (event) => {
    const requestUrl = event.request.url;

    if (requestUrl.endsWith("/sights/allSights")) {
        // Caching für "allSights"
        event.respondWith(
            caches.open(CACHE_NAME_SIGHTS).then((cache) =>
                fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone()).catch((err) => {
                            console.error("Fehler beim Cachen der Antwort für sights:", err);
                        });
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
                        cache.put(event.request, response.clone()).catch((err) => {
                            console.error("Fehler beim Cachen der Antwort für categories:", err);
                        });
                        return response;
                    })
                    .catch(() => cache.match(event.request))
            )
        );
    } else if (requestUrl.endsWith("/user/visited")) {
        // Caching für "visited spots"
        event.respondWith(
            caches.open(VISITED_SPOTS).then((cache) =>
                fetch(event.request)
                    .then((response) => {
                        cache.put(event.request, response.clone()).catch((err) => {
                            console.error("Fehler beim Cachen der Antwort für visited spots:", err);
                        });
                        return response;
                    })
                    .catch(() => cache.match(event.request))
            )
        );
    }
});

// Nachrichten vom Hauptthread verarbeiten
self.addEventListener("message", (event) => {
    const { action, key, cacheName } = event.data;

    if (action === "deleteCacheEntry" && cacheName && key) {
        // Cache-Eintrag entfernen
        caches.open(cacheName).then((cache) => {
            cache.delete(key).then((success) => {
                if (success) {
                    console.log(`Eintrag ${key} aus ${cacheName} wurde entfernt.`);
                } else {
                    console.log(`Kein Eintrag ${key} in ${cacheName} gefunden.`);
                }
            });
        });
    }
});





