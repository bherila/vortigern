var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ManifestPlugin = require('webpack-manifest-plugin');

var config = {
	devtool: 'source-map',
	debug: true,

	resolve: {
		extensions: ["", ".ts", ".tsx", ".js", ".jsx"],
		root: [path.resolve(__dirname, 'src')],
    modulesDirectories: [
      'src',
      'node_modules'
    ],
  },
	entry: {
		app: [
			'webpack-hot-middleware/client?reload=true',
			'./src/client.tsx'
		]
	},
	output: {
		path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].js',
    pathinfo: true
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				loader: 'react-hot!ts',
			},
			{
        test: /\.jsx$/,
        loader: 'babel?presets[]=es2015'
      },
			{
			  test: /\.json$/,
			  loader: 'json-loader',
			},
			{
				test: /\.css$/,
				include: /src\/app/,
				loaders: [
					'style',
					'css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]',
					'postcss'
				]
			},
			{
			  test: /\.css$/,
			  exclude: /src\/app/,
			  loader: 'style!css',
			},
			{
				test: /\.eot(\?.*)?$/,
				loader: "file?name=fonts/[hash].[ext]",
			},
			{
				test: /\.(woff|woff2)(\?.*)?$/,
				loader:"file-loader?name=fonts/[hash].[ext]",
			},
			{
				test: /\.ttf(\?.*)?$/,
				loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]",
			},
			{
				test: /\.svg(\?.*)?$/,
				loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]",
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
				loader: 'url?limit=1000&name=images/[hash].[ext]'
			},
		]
	},

	postcss: function () {
	  return [autoprefixer({ browsers: ['last 2 versions'] })];
	},

	plugins: [
		new ManifestPlugin({
		  fileName: '../manifest.json',
		}),
		new webpack.DefinePlugin({
		  'process.env': {
		    BROWSER: JSON.stringify(true),
		    NODE_ENV: JSON.stringify('development'),
		  }
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]

}

module.exports = config;