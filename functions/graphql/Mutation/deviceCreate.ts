import { PrismaClient } from '@prisma/client';
import { AppSyncResolverHandler } from 'aws-lambda';
import { MutationDeviceCreateArgs, Device } from '../../../../appsync';

const prisma = new PrismaClient();

export const handler: AppSyncResolverHandler<MutationDeviceCreateArgs, Device> =
  async (ctx) => {
    const { name } = ctx.arguments.input;
    let device = await prisma.device.create({
      data: {
        id: 1,
        name,
      },
    });

    return {
      id: '111',
      name: 'S',
    };
  };
