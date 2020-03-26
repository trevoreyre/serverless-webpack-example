# serverless-webpack-example

A simple example of using Webpack to optimize AWS Lambdas written in TypeScript, deployed with Serverless Framework.

There are two example folders:

- `node` - Vanilla Node.js lambda and no webpack
- `webpack-typescript` - Node.js lambda written in TypeScript, built with Webpack
- `webpack-typescript-optimized` - Optimized version of `webpack-typescript`. All `node_modules` are included in bundle. The `aws-sdk` library is excluded because it is already available in the AWS runtime.
