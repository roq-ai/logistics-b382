import axios from 'axios';
import queryString from 'query-string';
import { ContainerInterface, ContainerGetQueryInterface } from 'interfaces/container';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getContainers = async (
  query?: ContainerGetQueryInterface,
): Promise<PaginatedInterface<ContainerInterface>> => {
  const response = await axios.get('/api/containers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createContainer = async (container: ContainerInterface) => {
  const response = await axios.post('/api/containers', container);
  return response.data;
};

export const updateContainerById = async (id: string, container: ContainerInterface) => {
  const response = await axios.put(`/api/containers/${id}`, container);
  return response.data;
};

export const getContainerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/containers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContainerById = async (id: string) => {
  const response = await axios.delete(`/api/containers/${id}`);
  return response.data;
};
