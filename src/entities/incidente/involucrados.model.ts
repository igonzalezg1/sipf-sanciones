export interface Involucrados {
  data: IncidenteInvolucrado[];
}

export interface IncidenteInvolucrado {
  id: number;
  incidente_id: number;
  tipo_involucrado_id: number;
  tipo_participacion_id: number;
  persona_id: number;
  referencia_id: number;
  identificador: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  tipo_involucrado: unknown;
  tipo_participacion: unknown;
  es_ppl_sesion: boolean;
  fecha_ingreso: string;
}
