import { RequestInterface } from 'interfaces/request';
import { WarehouseInterface } from 'interfaces/warehouse';
import { GetQueryInterface } from 'interfaces';

export interface ContainerInterface {
  id?: string;
  status: string;
  warehouse_id?: string;
  created_at?: any;
  updated_at?: any;
  request?: RequestInterface[];
  warehouse?: WarehouseInterface;
  _count?: {
    request?: number;
  };
}

export interface ContainerGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  warehouse_id?: string;
}
