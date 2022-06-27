const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Services': path.resolve(__dirname, 'src/services'),
      '@Utils': path.resolve(__dirname, 'src/utils'),
      '@HttpServices': path.resolve(__dirname, 'src/services/httpServices'),
      '@Actions': path.resolve(__dirname, 'src/store/actions'),
      '@Modules': path.resolve(__dirname, 'src/modules'),
      '@Context': path.resolve(__dirname, 'src/context'),
    }
  },
};