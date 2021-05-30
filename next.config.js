const withReactSvg = require('next-react-svg')
const optimizedImages = require('next-optimized-images');
const withPlugins = require('next-compose-plugins');
const path = require('path')

const nextConfig = {
  include: path.resolve(__dirname, 'assets/svg'),
  basePath: '/',
  assetPrefix: '/',
}

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png'],
    optimizeImages: true,
    optimizeImagesInDev: true,
    mozjpeg: {
      quality: 90
    },
    optipng: {
      optimizationLevel: 5
    }
  }],
  withReactSvg,
], nextConfig);
