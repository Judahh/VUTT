// eslint-disable-next-line @typescript-eslint/no-var-requires
const withWorkbox = require('next-with-workbox');
module.exports = withWorkbox({
  workbox: {
    swSrc: 'worker.js',
    // .
    // ..
    // ... any workbox-webpack-plugin.GenerateSW option
  },
  // .
  // ..
  // ... other Next.js config values
});
