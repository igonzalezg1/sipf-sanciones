import type {
  ControversiaCreate,
  ControversiaResolucionCreate,
} from 'src/entities/controversia/controversia.model.ts';
import { BaseService } from '../baseService';
import type { Incidencia } from 'entities/incidente/incidente.model';

export class ControversiaService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(
    incidente_id: number,
    sancion_id: number,
    payload: ControversiaCreate,
  ): Promise<Incidencia | null> {
    return this.patch(
      `${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-controversia`,
      payload,
    );
  }

  async enviarComiteTecnico(
    incidente_id: number,
    sancion_id: number | null,
  ): Promise<Incidencia | null> {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/comite-tecnico`, {});
  }

  async guardarResolucion(
    incidente_id: number,
    sancion_id: number,
    payload: ControversiaResolucionCreate,
  ) {
    return this.patch(
      `${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-controversia-resolucion`,
      payload,
    );
  }

  async enviarSeguridad(incidente_id: number, sancion_id: number | null) {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/enviar-seguridad`, {});
  }
}
