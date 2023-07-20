import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { containerValidationSchema } from 'validationSchema/containers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.container
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getContainerById();
    case 'PUT':
      return updateContainerById();
    case 'DELETE':
      return deleteContainerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getContainerById() {
    const data = await prisma.container.findFirst(convertQueryToPrismaUtil(req.query, 'container'));
    return res.status(200).json(data);
  }

  async function updateContainerById() {
    await containerValidationSchema.validate(req.body);
    const data = await prisma.container.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteContainerById() {
    const data = await prisma.container.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
