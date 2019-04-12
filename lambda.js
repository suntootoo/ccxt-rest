'use strict'
const awsServerlessExpress = require('aws-serverless-express')
var app = require('./src/app');
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }