import ApiRepository from 'app/services/api/ApiRepository';
import RequestInterface from 'app/services/api/interfaces';
import { Response } from 'app/services/api/Http';

class ApiUseCase {
  constructor(private apiRepository: ApiRepository) {}

  execute = async (data: RequestInterface): Promise<Response | undefined> => {
    if (data.url && data.method) {
      const config: any = {};

      if (data.idToken) {
        config.headers.Authorization = `Bearer ${data.idToken}`;
      }
      if (data.isFormData || data.method === 'PATCH') {
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      if (data.params) {
        config.params = data.params;
      }

      switch (data.method) {
        case 'DELETE':
          return this.apiRepository.get(data.url, config);
        case 'POST':
          return this.apiRepository.post(data.url, data.data, config);
        case 'PUT':
          return this.apiRepository.put(data.url, data.data, config);
        case 'PATCH':
          return this.apiRepository.patch(data.url, data.data, config);
        default:
          return this.apiRepository.get(data.url, config);
      }
    }
    return undefined;
  };
}

export default ApiUseCase;
