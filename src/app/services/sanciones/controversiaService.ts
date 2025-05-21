import type { ControversiaCreate } from 'src/entities/controversia/controversia.model.ts';
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
}
