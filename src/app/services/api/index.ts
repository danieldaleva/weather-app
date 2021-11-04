import ApiController from 'app/services/api/ApiController';
import ApiService from 'app/services/api/ApiService';
import ApiUseCase from 'app/services/api/ApiUseCase';

const apiExecute = new ApiUseCase(new ApiService());

const apiController = new ApiController(apiExecute);

export { apiExecute, apiController };
