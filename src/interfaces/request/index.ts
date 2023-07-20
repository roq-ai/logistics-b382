import { UserInterface } from 'interfaces/user';
import { WarehouseInterface } from 'interfaces/warehouse';
import { ContainerInterface } from 'interfaces/container';
import { GetQueryInterface } from 'interfaces';

export interface RequestInterface {
  id?: string;
  customer_id?: string;
  warehouse_id?: string;
  container_id?: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  warehouse?: WarehouseInterface;
  container?: ContainerInterface;
  _count?: {};
}

export interface RequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  warehouse_id?: string;
  container_id?: string;
  status?: string;
}
