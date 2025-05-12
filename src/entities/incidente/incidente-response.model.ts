import type { Incidencia } from './incidente.model';

export interface IncidenciaResponse {
  data: Incidencia[];
  meta: {
    pagination: {
      totaltotal: number;
      count: number;
      per_page: number;
      current_page: number;
      total_pages: number;
      links: object;
    };
  };
}
