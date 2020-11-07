type Parameters = {
  method?: string;
  body?: object;
  testResponse?: boolean;
  authenticationToken?: string;
};

const buildHeaders = (contentType?: string, authenticationToken?: string) => ({
  ...(contentType ? { 'Content-Type': contentType } : {}),
  ...(authenticationToken ? { Authentication: `Bearer ${authenticationToken}` } : {}),
});

export default async (path: string, parameters?: Parameters) => {
  const url = `${process.env.VUE_APP_API_BASE_URL}${path}`;
  const headers = buildHeaders(parameters?.body && 'application/json', parameters?.authenticationToken);
  const response = await fetch(url, {
    headers,
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
