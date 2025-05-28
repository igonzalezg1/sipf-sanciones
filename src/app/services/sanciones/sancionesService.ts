import type { SancionCreate } from 'src/entities/sancion/sancion.model';
import { BaseService } from '../baseService';

export class SancionesService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(payload: SancionCreate): Promise<unknown> {
    return this.post(`${this.baseUrl}`, payload);
  }

  async editarSancion(id: number, payload: SancionCreate): Promise<unknown> {
    return this.put(`${this.baseUrl}/${id}`, payload);
  }

  async generarPdf(id?: number): Promise<{ base64Pdf: string } | null> {
    return this.get(`${this.baseUrl}/${id}/pdf`);
  }

  async mandarSeguridad(sancion_id?: number): Promise<unknown> {
    const payload = {};
    return this.patch(`${this.baseUrl}/${sancion_id}/enviar`, payload);
  }

  async suspenderSancion(id?: number): Promise<unknown> {
    return this.patch(`${this.baseUrl}/${id}/suspender`);
  }
}
