import type { TipoIncidente } from './tipoIncidente.model';
import type { Involucrados } from './involucrados.model';
import type { Sancion } from '../sancion/sancion.model';
export interface Incidencia {
  id: number;
  tipo_incidente_id: number;
  centro_id: number;
  descripcion_incidente: string;
  lugar_incidente: string;
  fecha_hora_registro: string;
  fecha_hora_registro_input: string;
  fecha_registro: string;
  hora_registro: string;
  folio: string;
  persona_registra: string;
  persona_registra_cargo: string;
  digito_personal_custodia: string;
  firmante_1_nombre: string;
  firmante_1_cargo: string;
  firmante_2_nombre: string | null;
  firmante_2_cargo: string | null;
  incidente_file: string;
  incidente_file_nombre: string;
  incidente_file_url: string;
  incidente_acta_file: string;
  incidente_acta_file_nombre: string | null;
  incidente_acta_file_url: string;
  tipo_incidente_otro: string | null;
  tipo_incidente_descripcion: string;
  tipo_incidente: TipoIncidente;
  involucrados: Involucrados;
  sanciones: Sancion | null;
  atendido: number;
  enviado: number;
  revisa_consejo_tecnico: number;
  confirmada_por_comite_tecnico: number;
  sancion_sin_efecto: number;
  puede_enviar_todas: boolean;
  estatus: string;
  usuario_asigna?: string;
  descripcion_completa?: string;
  articulo: Articulo | null;
}

export interface Articulo {
  id: number;
  descripcion: string;
  ley_aplicable_id: number;
  regla: string | null;
}
