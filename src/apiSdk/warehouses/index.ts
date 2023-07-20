import axios from 'axios';
import queryString from 'query-string';
import { WarehouseInterface, WarehouseGetQueryInterface } from 'interfaces/warehouse';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getWarehouses = async (
  query?: WarehouseGetQueryInterface,
): Promise<PaginatedInterface<WarehouseInterface>> => {
  const response = await axios.get('/api/warehouses', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createWarehouse = async (warehouse: WarehouseInterface) => {
  const response = await axios.post('/api/warehouses', warehouse);
  return response.data;
};

export const updateWarehouseById = async (id: string, warehouse: WarehouseInterface) => {
  const response = await axios.put(`/api/warehouses/${id}`, warehouse);
  return response.data;
};

export const getWarehouseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/warehouses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWarehouseById = async (id: string) => {
  const response = await axios.delete(`/api/warehouses/${id}`);
  return response.data;
};
