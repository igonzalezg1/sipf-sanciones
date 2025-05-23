import type { AmparoCreate, AmparoResolucionCreate } from 'src/entities/amparo/amparo.model.ts';
import { BaseService } from '../baseService';
import type { Incidencia } from 'entities/incidente/incidente.model';

export class AmparoService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(
    incidente_id: number,
    sancion_id: number,
    payload: AmparoCreate,
  ): Promise<Incidencia | null> {
    return this.patch(`${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-amparo`, payload);
  }

  async enviarComiteTecnicoAmparo(
    incidente_id: number,
    sancion_id: number | null,
  ): Promise<Incidencia | null> {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/comite-tecnico-amparo`, {});
  }

  async guardarResolucionAmparo(
    incidente_id: number,
    sancion_id: number,
    payload: AmparoResolucionCreate,
  ) {
    return this.patch(
      `${this.baseUrl}/${incidente_id}/${sancion_id}/agregar-amparo-resolucion`,
      payload,
    );
  }

  async enviarSeguridadAmparo(incidente_id: number, sancion_id: number | null) {
    if (!sancion_id) {
      return null;
    }
    return this.post(`${this.baseUrl}/${incidente_id}/${sancion_id}/enviar-seguridad-amparo`, {});
  }
}
