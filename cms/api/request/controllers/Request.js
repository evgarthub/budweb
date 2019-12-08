'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  find: async ctx => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
    }

    const data = await strapi.services.request.find(undefined, ['user', 'user.appartment', 'status']);  

    if(!data){
      return ctx.notFound();
    }

    ctx.send(data);
  },
    
    me: async ctx => {
        const user = ctx.state.user;

        if (!user) {
            return ctx.badRequest(null, [{ messages: [{ id: 'No authorization header was found' }] }]);
        }

        const data = await strapi.services.request.find({user:user.id}, ['user', 'user.appartment', 'status']);  

        if(!data){
            return ctx.notFound();
        }

        ctx.send(data);
    },
};


