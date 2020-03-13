const AwsSamPlugin = require('aws-sam-webpack-plugin')
const webpack = require('webpack')

const awsSamPlugin = new AwsSamPlugin()

const path = require('path')

module.exports = {
  // Loads the entry object from the AWS::Serverless::Function resources in your
  // SAM config. Setting this to a function will
  entry: () => awsSamPlugin.entry(),

  // Write the output to the .aws-sam/build folder
  output: {
    filename: chunkData => awsSamPlugin.filename(chunkData),
    libraryTarget: 'commonjs2',
    path: path.resolve('.')
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json']
  },
  target: 'node',
  plugins: [
    awsSamPlugin,
    new webpack.NormalModuleReplacementPlugin(/\.\.\/migrate/, '../util/noop.js'),
    new webpack.NormalModuleReplacementPlugin(/\.\.\/seed/, '../util/noop.js'),
    new webpack.IgnorePlugin(/mariasql/, /\/knex\//),
    new webpack.IgnorePlugin(/mssql/, /\/knex\//),
    new webpack.IgnorePlugin(/mysql/, /\/knex\//),
    new webpack.IgnorePlugin(/mysql2/, /\/knex\//),
    new webpack.IgnorePlugin(/oracle/, /\/knex\//),
    new webpack.IgnorePlugin(/oracledb/, /\/knex\//),
    new webpack.IgnorePlugin(/pg-query-stream/, /\/knex\//),
    new webpack.IgnorePlugin(/sqlite3/, /\/knex\//),
    new webpack.IgnorePlugin(/strong-oracle/, /\/knex\//),
    new webpack.IgnorePlugin(/redshift/, /\/knex\//),
    new webpack.IgnorePlugin(/pg-native/, /\/pg\//)
  ]
}
