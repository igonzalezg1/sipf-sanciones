import type { SancionCreate } from 'src/entities/sancion/sancion.model';
import { BaseService } from '../baseService';

export class SancionesService extends BaseService {
  private baseUrl = '/tecnico/seguridad/sanciones';

  async agregarSancion(payload: SancionCreate): Promise<unknown> {
    return this.post(`${this.baseUrl}`, payload);
  }

  async generarPdf(id?: number): Promise<{ base64Pdf: string } | null> {
    return this.get(`${this.baseUrl}/${id}/pdf`);
  }
}
