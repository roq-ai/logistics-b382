import { ContainerInterface } from 'interfaces/container';
import { RequestInterface } from 'interfaces/request';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface WarehouseInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  container?: ContainerInterface[];
  request?: RequestInterface[];
  user?: UserInterface;
  _count?: {
    container?: number;
    request?: number;
  };
}

export interface WarehouseGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
