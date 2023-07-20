import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { warehouseValidationSchema } from 'validationSchema/warehouses';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getWarehouses();
    case 'POST':
      return createWarehouse();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getWarehouses() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.warehouse
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'warehouse'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createWarehouse() {
    await warehouseValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.container?.length > 0) {
      const create_container = body.container;
      body.container = {
        create: create_container,
      };
    } else {
      delete body.container;
    }
    if (body?.request?.length > 0) {
      const create_request = body.request;
      body.request = {
        create: create_request,
      };
    } else {
      delete body.request;
    }
    const data = await prisma.warehouse.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
