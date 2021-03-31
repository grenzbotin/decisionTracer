const withReactSvg = require('next-react-svg')
// const withOptimizedImages = require('next-optimized-images');
const path = require('path')

const compose = (...fns) => (...args) => fns.reduceRight((y, f) => f(y), ...args);

const nextConfig = {
  include: path.resolve(__dirname, 'assets/svg'),
  basePath: '/decisionTracer',
  assetPrefix: '/decisionTracer/',
}


module.exports = compose(withReactSvg)(nextConfig);