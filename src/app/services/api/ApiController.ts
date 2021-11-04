import { Response } from 'app/services/api/Http';
import RequestInterface from 'app/services/api/interfaces';
import ApiUseCase from 'app/services/api/ApiUseCase';

class ApiController {
  constructor(private apiUseCase: ApiUseCase) {}

  async handle(request: RequestInterface): Promise<Response | undefined> {
    const { url, method, params, data, idToken, isFormData } = request;

    try {
      return await this.apiUseCase.execute({
        url,
        method,
        params,
        data,
        idToken,
        isFormData,
      });
    } catch (error: any) {
      return error;
    }
  }
}

export default ApiController;
