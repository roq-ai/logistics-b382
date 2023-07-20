const mapping: Record<string, string> = {
  containers: 'container',
  requests: 'request',
  users: 'user',
  warehouses: 'warehouse',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
