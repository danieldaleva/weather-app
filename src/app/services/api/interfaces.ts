export default interface RequestInterface {
  url: string;
  method: string;
  data?: any;
  params?: any;
  idToken?: string;
  isFormData?: boolean;
}
