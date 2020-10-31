type Parameters = {
  method?: string;
  body?: object;
};

export default async (path: string, parameters?: Parameters) => {
  const url = `${process.env.API_BASE_URL}${path}`;
  const response = await fetch(url, {
    headers: parameters?.body && {
      'Content-Type': 'application/json',
    },
    method: parameters?.method || 'GET',
    body: parameters?.body && JSON.stringify(parameters.body),
  });
  if (!response.ok) {
    throw new Error(`Request to ${path} failed: ${response.status} ${response.statusText}`);
  }
  return response.json(); // @todo check it works with plain text response body
};
