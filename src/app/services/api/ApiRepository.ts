import { Request, Response } from 'app/services/api/Http';

export default interface ApiRepository {
  readonly get: (
    url: string,
    config?: Request,
  ) => Promise<Response | undefined>;
  readonly delete: (
    url: string,
    config?: Request,
  ) => Promise<Response | undefined>;
  readonly post: (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ) => Promise<Response | undefined>;
  readonly put: (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ) => Promise<Response | undefined>;
  readonly patch: (
    url: string,
    data: Record<string, unknown>,
    config?: Request,
  ) => Promise<Response | undefined>;
}
