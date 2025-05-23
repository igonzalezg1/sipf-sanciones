// src/entities/incidencias/incidente.model.ts

/**
 * Incidente registrado dentro de un centro, asociada a una persona o situación particular.
 *
 */
export interface Incidente {
  id: number;
  tipo_incidente: TipoIncidente;
  tipo_incidente_id: number | null;
  centro_id: number;
  folio: string;
  fecha_hora_registro: string;
  fecha_hora_registro_input: string;
  fecha_registro: string;
  hora_registro: string;
  persona_registra: string;
  persona_registra_cargo: string;
  digito_personal_custodia: string;
  lugar_incidente: string;
  descripcion_incidente: string;
  revisa_consejo_tecnico: boolean | null;
  incidente_file: string;
  incidente_file_nombre: string;
  incidente_acta_file: string;
  incidente_acta_file_url: string;
  incidente_acta_file_nombre: string;
  fecha: string;
  hora: string;
  involucrados: IncidenteInvolucrado[];
  involucrados_para_sancion: IncidenteInvolucrado[];
  sanciones: { data: unknown[] };
  tipo_incidente_otro: string;
  tipo_incidente_descripcion: string;
  firmante_1_nombre: string;
  firmante_1_cargo: string;
  firmante_2_nombre: string;
  firmante_2_cargo: string;
  enviado: number;
  estatus: string;
  atendido: number;
  puede_enviar_todas?: boolean;
  confirmada_por_comite_tecnico?: number;
  sancion_sin_efecto?: number;
}

/**
 * Información de un involucrado en una incidencia.
 */
export interface TipoIncidente {
  id: number;
  descripcion: string;
  value: number;
  text: string;
  label: string;
}

export interface TipoParticipacion {
  id: number;
  descripcion: string;
  value: number;
  text: string;
  label: string;
}

export interface TipoInvolucrado {
  id: number;
  descripcion: string;
  value: number;
  text: string;
  label: string;
}

export interface IncidenteInvolucrado {
  id: number;
  incidente_id: number | null;
  tipo_involucrado_id: number;
  tipo_participacion_id: number | null;
  persona_id: number | null;
  num_expediente: string;
  referencia_id: number | null;
  identificador: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  tipo_involucrado: TipoInvolucrado | null;
  tipo_participacion: TipoParticipacion | null;
  es_ppl_sesion: boolean;
  fecha_ingreso: string;
  fecha_ingreso_format: string;
  ubicacion: string;
}
export interface CurrentInvolucrado {
  persona_id?: number | null;
  curp: string | null;
  fecha_ingreso: string;
  num_expediente: string;
  identificador: string;
  fecha_ingreso_ultimo_movimiento: string;
  value: number;
  text: string;
  nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_ingreso_format: string;
  ubicacion: string | null;
  photo: string;
  nombre_completo: string;
}
