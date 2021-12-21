const CACHE_ELEMENTS = [
    "./",
    "./js/main.js",
    "./css/styles.min.css",
    "./img/delfines.png",
    "./img/cosito-del-clima.png"
];


const CACHE_NAME = "v1_cache_cosito_del_clima";


self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            cache
                .addAll(CACHE_ELEMENTS) 
                .then(() => {
                    self.skipWaiting();
                })
                .catch((error) => console.log(error));
        })
    );
});

self.addEventListener("activate", (e) => {
    const cacheWhiteList = [CACHE_NAME];

    e.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        return (
                            cacheWhiteList.indexOf(cacheName) === -1 &&
                            caches.delete(cacheName)
                        );
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((res) => {
            if(res) {
                return res;
            }

            return fetch(e.request);
        })
    );
});