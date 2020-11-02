type Parameters = {
  method?: string;
  body?: object;
  testResponse?: boolean;
};

export default async (path: string, parameters?: Parameters) => {
  const url = `${process.env.VUE_APP_API_BASE_URL}${path}`;
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
  if (parameters?.testResponse) {
    return response.text();
  }
  return response.json(); // @todo check it works with plain text response body
};
