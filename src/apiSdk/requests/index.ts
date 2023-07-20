import axios from 'axios';
import queryString from 'query-string';
import { RequestInterface, RequestGetQueryInterface } from 'interfaces/request';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRequests = async (query?: RequestGetQueryInterface): Promise<PaginatedInterface<RequestInterface>> => {
  const response = await axios.get('/api/requests', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createRequest = async (request: RequestInterface) => {
  const response = await axios.post('/api/requests', request);
  return response.data;
};

export const updateRequestById = async (id: string, request: RequestInterface) => {
  const response = await axios.put(`/api/requests/${id}`, request);
  return response.data;
};

export const getRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRequestById = async (id: string) => {
  const response = await axios.delete(`/api/requests/${id}`);
  return response.data;
};
