import { BaseService } from '../baseService';
import type { IncidenciaResponse } from 'entities/incidente/incidente-response.model';

export class IncidenciasService extends BaseService {
  private baseUrl = '/tecnico/seguridad/incidencias';

  async getIncidencias(include: string, scope: object): Promise<IncidenciaResponse | null> {
    const params = {
      include,
      scope: JSON.stringify(scope),
      shor: 'created_at',
      order: 'desc',
    };
    return this.post(`${this.baseUrl}/paginate`, params);
  }

  async marcarNoVisto(ids: number[]): Promise<IncidenciaResponse | null> {
    const idsObj = {
      ids: JSON.stringify(ids),
    };
    return this.post(`${this.baseUrl}/marcar-sin-efecto`, idsObj);
  }

  async enviarComite(ids: number[]): Promise<IncidenciaResponse | null> {
    const idsObj = {
      ids: JSON.stringify(ids),
    };
    return this.post(`${this.baseUrl}/confirmar-comite-tecnico`, idsObj);
  }
}
