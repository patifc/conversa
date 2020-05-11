const staticCacheName = 'site-static-v4';
const dynamicCache = 'site-dynamic-v3';
const assets = [

    '/',
    '/index.html',
    '/login.html',
    '/public/js/app.js',
    '/public/js/index.js',
    '/public/server.js',
    '/public/js/auth.js',
    '/public/css/style.css',
    '/img/logo.png',
    '/fallback.html'
];
 //chache size limit function
 const limitCacheSize =(name, size) => {
 caches.open(name).then(cache => {
     cache.keys().then(keys =>{
       if(keys.length > size){
           cache.delete(keys[0]).then(limitCacheSize(name, size));
       }  
     })

 })
 };
self.addEventListener('install', evt => {
   // console.log('service worker has been installed');
evt.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
    console.log('caching shell assets');
    cache.addAll(assets);
})
);

});

self.addEventListener('activate', evt =>{
        console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys =>{
            //console.log(keys);
            return Promise.all(keys
                .filter(keys => keys !== staticCacheName && key !==dynamicCache)
                .map(keys => caches.delete(key))
                )
        })
    );
});
//fecth events
self.addEventListener('fetch', evt => {
  if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
  evt.respondWith(
     caches.match(evt.request).then(cacheRes => {
           return cacheRes || fetch(evt.request).then(fetchRes =>{
           return caches.open(dynamicCache).then(cache =>{
             cache.put(evt.request.url, fetchRes.clone());
             limitCacheSize(dynamicCache, 15);
           return fetchRes; 
            })
           });
       }).catch(()=> {
       if(evt.request.url.indexOf('.html') > -1){
        return caches.match('/fallback.html');
           }
    })
    );
  }
});
