import type { Apelacion } from 'entities/apelacion/apelacion.model';
import type { Controversia } from 'entities/controversia/controversia.model';

export interface Sancion {
  data: SancionData[];
}

export interface SancionData {
  id: number;
  tipo_sancion_id: number;
  folio: string;
  tipo_sancion_nombre: string;
  tipo_sancion_descripcion: string;
  tipo_sancion: { label: string; value: number };
  descripcion: string;
  sancion_file: string;
  sancion_file_nombre: string;
  sancion_file_url: string;
  sancion_acta_file: string | null;
  sancion_acta_file_nombre: string | null;
  sancion_acta_file_url: string | null;
  fecha_hora_registro: string;
  fecha_hora_registro_input: string;
  fecha_registro: string;
  hora_registro: string;
  pasaron_tres_dias_sancion: boolean;
  etapa_sancion: string;
  estatus_sancion: string;
  puede_mandar_seguridad: boolean;
  resolucion_controversia_guardada: boolean;
  resolucion_apelacion_guardada: boolean;
  resolucion_amparo_guardada: boolean;
  controversia: Controversia;
  apelacion: Apelacion;
}

export interface SancionCreate {
  tipo_sancion_id: number;
  no_sesion_comite: string | null;
  fecha_registro: string | null;
  fecha_hora_inicio_sancion: string | null;
  fecha_hora_fin_sancion: string | null;
  dias_sancion: string | null;
  observaciones: string | null;
  descripcion: string | null;
  firmante_1_nombre: string | null;
  firmante_1_cargo: string | null;
  firmante_2_nombre: string | null;
  firmante_2_cargo: string | null;
  centro_id: number | null;
  involucrados: string | null;
}

export interface TipoSancion {
  value: number;
  text: string;
  id: number;
  descripcion: string;
  label: string;
}
