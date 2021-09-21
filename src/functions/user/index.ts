import { AppSyncResolverHandler } from 'aws-lambda';
import { User, Query } from '../../../appsync';

const resolvers = {
    Query: {
      me: (ctx) => { 
        console.log(ctx)
        return {
            id: ctx.identity.sub,
            username: ctx.identity.username,
        }
      },
    },
  } 

export const handler: AppSyncResolverHandler<Query, User> = async (event) => {
     
    const typeHandler = resolvers[event.info.parentTypeName];
    if (typeHandler) {
      const resolver = typeHandler[event.info.fieldName];
      if (resolver) {
        return await resolver(event);
      }
    }
    throw new Error("Resolver not found.");
  };