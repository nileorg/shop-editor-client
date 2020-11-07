import makeRequest from './makeRequest';

export default (authenticationToken: string) => makeRequest('/shop', { authenticationToken });
