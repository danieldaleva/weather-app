import axios, { Request, Response } from 'app/services/api/Http';
import ApiRepository from 'app/services/api/ApiRepository';

class ApiService implements ApiRepository {
  constructor() {}

  get = (url: string, config?: Request): Promise<Response | undefined> =>
    axios.get(url, config);

  delete = (url: string, config?: Request): Promise<Response | undefined> =>
    axios.delete(url, config);

  post = (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ): Promise<Response | undefined> => axios.post(url, data, config);

  put = (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ): Promise<Response | undefined> => axios.put(url, data, config);

  patch = (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ): Promise<Response | undefined> => axios.patch(url, data, config);
}

export default ApiService;
