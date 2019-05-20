'use strict';

/**
 * Siteconfig.js controller
 *
 * @description: A set of functions called "actions" for managing `Siteconfig`.
 */

module.exports = {

  /**
   * Retrieve siteconfig records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.siteconfig.search(ctx.query);
    } else {
      return strapi.services.siteconfig.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a siteconfig record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.siteconfig.fetch(ctx.params);
  },

  /**
   * Count siteconfig records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.siteconfig.count(ctx.query);
  },

  /**
   * Create a/an siteconfig record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.siteconfig.add(ctx.request.body);
  },

  /**
   * Update a/an siteconfig record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.siteconfig.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an siteconfig record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.siteconfig.remove(ctx.params);
  }
};
