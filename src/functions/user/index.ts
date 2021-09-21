const resolvers = {
    Query: {
      me: (ctx) => { 
          console.log(ctx.identity)
        return {
            id: ctx.identity.sub,
            username: ctx.identity.username,
        }
      },
    },
  }

export const handler = async (event) => {
     
    const typeHandler = resolvers[event.info.parentTypeName];
    if (typeHandler) {
      const resolver = typeHandler[event.info.fieldName];
      if (resolver) {
        return await resolver(event);
      }
    }
    throw new Error("Resolver not found.");
  };