import { PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()


const resolvers = {
  Query: {
    devices: async (ctx) => {
      console.log(ctx.args.first)
      const devices = await prisma.device.findMany({
       take: ctx.args.first
      })
      
    return {
      
        edges: devices.map(device => ({node: device, cursor: 'dddd'})),
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
          endCursor: "opaquecursor"
        }
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
