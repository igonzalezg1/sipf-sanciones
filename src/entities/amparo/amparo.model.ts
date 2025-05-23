export interface AmparoCreate {
  cuando_aplica: string | null;
  fecha_solicitud: string | null;
  numero_sesion: string | null;
  organo_jurisdiccional: string | null;
  observaciones: string | null;
  amparo_file: string | null;
}

export interface Amparo {
  en_comite: number | null;
  fecha_fin_real_sancion: string | null;
  fecha_fin_sancion: string | null;
  fecha_inicio_sancion: string | null;
  fecha_resolucion: string | null;
  fecha_solicitud: string | null;
  fecha_suspencion: string | null;
  file_name: string | null;
  file_name_resoluccion: string | null;
  file_path: string | null;
  file_path_resolucion: string | null;
  no_sesion_comite: string | null;
  observaciones: string | null;
  observaciones_resolucion: string | null;
  organo_jurisdiccional: string | null;
  tipo_sancion: string | null;
  id: number | null;
}

export interface AmparoResolucionCreate {
  fecha_resolucion: string | null;
  fecha_inicio_sancion: string | null;
  fecha_fin_sancion: string | null;
  fecha_suspencion: string | null;
  observaciones_resolucion: string | null;
  resolucion_juez: string | null;
  amparo_resolucion_file: string | null;
}
