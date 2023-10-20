const path = require('path');

module.exports = {
  entry: './src/index.tsx', // Adjust the entry point as needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'], // Add TypeScript loader if needed
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp4|webm|ogg|mp3|wav|flac)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // Embed files smaller than 8kb as data URLs
              name: 'assets/[name].[hash:8].[ext]', // Output file name and path
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add TypeScript extensions if needed
    fallback: {
      "buffer": require.resolve("buffer/"),
      "crypto": false,
      "stream": require.resolve("stream-browserify"),
      "util": require.resolve("util/"),
      "timers": require.resolve("timers-browserify"),
    }
  },
  devServer: {
    contentBase: './dist', // Serve files from the 'dist' directory
    port: 3000, // Adjust the port as needed
  },
};