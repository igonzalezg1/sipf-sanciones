import type { TipoSancion } from 'entities/sancion/sancion.model';
import { BaseService } from '../baseService';

export class CatalogsService extends BaseService {
  private baseUrl = '/cat';

  async getTiposSancion(articuloId: number): Promise<TipoSancion[] | null> {
    return this.get(`${this.baseUrl}/articulo-aplicable-sanciones/${articuloId}`);
  }
}
