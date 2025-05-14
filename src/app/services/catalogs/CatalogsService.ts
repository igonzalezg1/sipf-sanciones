import type { TipoSancion } from 'entities/sancion/sancion.model';
import { BaseService } from '../baseService';

export class CatalogsService extends BaseService {
  private baseUrl = '/cat';

  async getTiposSancion(): Promise<TipoSancion[] | null> {
    return this.get(`${this.baseUrl}/tipos-sancion`);
  }
}
