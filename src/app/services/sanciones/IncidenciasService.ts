import { BaseService } from '../baseService';
import type { IncidenciaResponse } from 'entities/incidente/incidente-response.model';

export class IncidenciasService extends BaseService {
  private baseUrl = '/tecnico/seguridad/incidencias';

  async getIncidencias(): Promise<IncidenciaResponse | null> {
    return this.post(`${this.baseUrl}/paginate`);
  }
}
