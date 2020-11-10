class InvalidResponseError extends Error {
  constructor(response: Response) {
    super(`Invalid response from ${response.url}: ${response.status} ${response.statusText}`);
  }
}

export default (response: Response) => {
  if (!response.ok) {
    throw new InvalidResponseError(response);
  }
};
