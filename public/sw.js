const CACHE_NAME = `TASK_MANAGER`;

self.addEventListener(`install`, (evt) => {
  
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        `/`,
        `/index.html`,
        `/bundle.js`,
        `/css/normalize.css`,
        `/css/style.css`,
        `./fonts/HelveticaNeueCyr-Bold.woff`,
        `./fonts/HelveticaNeueCyr-Bold.woff2`,
        `./fonts/HelveticaNeueCyr-Medium.woff`,
        `./fonts/HelveticaNeueCyr-Medium.woff2`,
        `./fonts/HelveticaNeueCyr-Roman.woff`,
        `./fonts/HelveticaNeueCyr-Roman.woff2`,
        `./img/add-photo.svg`,
        `./img/close.svg`,
        `./img/sample-img.jpg`,
        `./img/wave.svg`
      ]);
    });

  evt.waitUntil(openCache);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
    caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        return response ? response : fetch(evt.request);
      })
      .catch((err) => {
        console.error({err});
        throw err;
      })
  );
});
