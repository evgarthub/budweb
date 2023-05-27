'use strict';

/**
 * ticket-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ticket-status.ticket-status');
