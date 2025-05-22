import type {
  ApelacionCreate,
  ApelacionResolucionCreate,
} from 'src/entities/apelacion/apelacion.model.ts';
import { BaseService } from '../baseService';
import type { Incidencia } from 'entities/incidente/incidente.model';

export class ApelacionService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(
    incidente_id: number,
    sancion_id: number,
    payload: ApelacionCreate,
  ): Promise<Incidencia | null> {
    return this.patch(`${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-apelacion`, payload);
  }

  async enviarComiteTecnico(
    incidente_id: number,
    sancion_id: number | null,
  ): Promise<Incidencia | null> {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/comite-tecnico-apelacion`, {});
  }

  async guardarResolucion(
    incidente_id: number,
    sancion_id: number,
    payload: ApelacionResolucionCreate,
  ) {
    return this.patch(
      `${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-apelacion-resolucion`,
      payload,
    );
  }

  async enviarSeguridad(incidente_id: number, sancion_id: number | null) {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/enviar-seguridad-apelacion`, {});
  }
}
