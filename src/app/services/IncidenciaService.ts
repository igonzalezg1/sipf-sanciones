import { BaseService } from './baseService';
import type { PaginatedResponse } from './baseService';
import { appConfig } from 'src/shared/config/app.config';
import type { Incidencia } from 'entities/incidente/incidente.model';

export class IncidenciaService extends BaseService {
  async getIncidenciasPaginadas(
    page = 1,
    params: Record<string, unknown> = {},
  ): Promise<PaginatedResponse<Incidencia> | null> {
    const url = `${appConfig.apiUrl}/tecnico/seguridad/incidencias/paginate`;

    const requestParams = {
      ...params,
      scope: typeof params.scope === 'object' ? JSON.stringify(params.scope) : params.scope,
      include: params.include ?? '',
      shor: 'created_at',
      order: 'desc',
    };

    return this.paginate<Incidencia>(url, page, requestParams);
  }

  async marcarNoVisto(ids: number[]): Promise<Incidencia[] | null> {
    const url = `${appConfig.apiUrl}/tecnico/seguridad/incidencias/marcar-sin-efecto`;
    const payload = { ids: JSON.stringify(ids) };
    return this.post(url, payload);
  }

  async enviarComite(ids: number[]): Promise<Incidencia[] | null> {
    const url = `${appConfig.apiUrl}/tecnico/seguridad/incidencias/confirmar-comite-tecnico`;
    const payload = { ids: JSON.stringify(ids) };
    return this.post(url, payload);
  }
}
