import { BaseService } from '../baseService';

export class SancionesService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(): Promise<unknown> {
    return this.post(`${this.baseUrl}`);
  }
}
