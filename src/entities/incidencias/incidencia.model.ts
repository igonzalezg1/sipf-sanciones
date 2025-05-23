import type { ArticuloLey, LeyAplicable } from 'entities/catalogos/leyes.model';
import type { SancionData } from 'entities/sancion/sancion.model';

/**
 * Incidencia registrada dentro de un centro, asociada a una persona o situación particular.
 */
export interface Incidencia {
  id: number;
  centro_id: number;
  folio: string;
  fecha_hora_registro: string;
  fecha_hora_registro_input: string;
  fecha_registro: string;
  hora_registro: string;
  persona_registra: string;
  persona_registra_cargo: string;
  lugar_incidente: string;
  descripcion_incidente: string;
  revisa_consejo_tecnico: number;
  incidente_file: string;
  incidente_file_nombre: string | null;
  incidente_file_url: string;
  incidente_acta_file: string;
  incidente_acta_file_nombre: string | null;
  incidente_acta_file_url: string;
  firmante_1_nombre: string;
  firmante_1_cargo: string;
  firmante_2_nombre: string | null;
  firmante_2_cargo: string | null;
  enviado: number;
  estatus: string;
  atendido: number;
  puede_enviar_todas: boolean;
  confirmada_por_comite_tecnico: number;
  tipo_incidente_descripcion: string;
  sancion_sin_efecto: number;
  numero_reporte: string;
  tipo_incidencia_ley_aplicable: number;
  tipo_incidencia_articulo_aplicable: number;
  ley: LeyAplicable;
  articulo: ArticuloLey;
  involucrados: { data: Involucrado[] };
  involucrados_para_sancion: { data: Involucrado[] };
  sanciones?: {
    data: SancionData[];
  };
  usuario_asigna?: string;
  descripcion_completa?: string;
}

/**
 * Información de un involucrado en una incidencia.
 */
export interface Involucrado {
  id: number;
  incidente_id: number;
  tipo_participacion_id: number;
  tipo_involucrado_id: number;
  persona_id: number;
  referencia_id: number | null;
  identificador: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  fecha_ingreso: string;
  fecha_ingreso_format: string;
  es_ppl_sesion: number;
  tipo_involucrado: TipoSimple;
  tipo_participacion: TipoSimple;
  persona: Persona;
  ubicacion: string;
}

/**
 * Información de un involucrado en una incidencia.
 */
export interface TipoSimple {
  id: number;
  value: string;
  label: string;
  description: string;
  descripcion: string;
}

/**
 * Información de una persona involucrada en una incidencia.
 */
export interface Persona {
  id: number;
  nombre: string;
  expedientes: Expediente;
}

/**
 * Información de un expediente asignado a una persona privada de la libertad.
 */
export interface Expediente {
  id: number;
  persona_id: number;
  centro_id: number;
  num_expediente: string;
  cib: string | null;
  cib_si_no: string | null;
  folio_resguardo: string;
  institucion_internacional: string | null;
  abrir_procesos: number;
  readonly_biometrico: string | null;
  readonly_senia: string | null;
  readonly_info: string | null;
  estatus: string;
  estatus_centro: string;
  estatus_proceso: string | null;
  readonly: number;
  fecha_ingreso: string;
  centro: Centro;
}

/**
 * Información de un centro penitenciario o unidad de internamiento.
 */
export interface Centro {
  id: number;
  codigo: string;
  nombre_centro: string;
  nombre_completo: string;
  codigo_centro: string | null;
  tipo: string;
  entrada: string;
  numero: number;
  entidad_federativa: number;
}
