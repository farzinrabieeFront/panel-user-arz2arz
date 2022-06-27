const path = require("path");

module.exports = {
  module: {
    rules: [],
  },
  resolve:{
    alias:{}
  }
  // resolve: {
  //   alias: {
  //     myApp: path.resolve(__dirname, 'src'),
  //   },
  //   extensions: ['', '.js', '.jsx']
  // },
};

// module.exports = {
//   resolve: {
//     alias: {
//       // utils: path.resolve(__dirname, 'src/utils/'),
//       // components: path.resolve(__dirname, 'src/components/'),
//       utils$: path.resolve(__dirname, 'src/utils/')
//     },
//   },
// };
