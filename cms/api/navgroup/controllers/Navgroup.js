'use strict';

/**
 * Navgroup.js controller
 *
 * @description: A set of functions called "actions" for managing `Navgroup`.
 */

module.exports = {

  /**
   * Retrieve navgroup records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.navgroup.search(ctx.query);
    } else {
      return strapi.services.navgroup.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a navgroup record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.navgroup.fetch(ctx.params);
  },

  /**
   * Count navgroup records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.navgroup.count(ctx.query);
  },

  /**
   * Create a/an navgroup record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.navgroup.add(ctx.request.body);
  },

  /**
   * Update a/an navgroup record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.navgroup.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an navgroup record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.navgroup.remove(ctx.params);
  }
};
