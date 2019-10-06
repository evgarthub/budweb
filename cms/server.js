#!/usr/bin/env node
'use strict';

// Start Strapi
const strapi = require('strapi');
strapi().start();

// README: to run ``pm2 start --name="somenamehere" server.js``
