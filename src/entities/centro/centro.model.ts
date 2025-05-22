/**
 * Representa un centro penitenciario o unidad de internamiento.
 */
export interface Centro {
  id: number;
  nombre_centro: string;
  codigo: string;
  nomenclatura_centro: string;
  consecutivo_inicio: number;
  entidad_federativa: number;
  municipio: number;
  tipo: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  nombre_completo: string;
  numero: number;
  entrada: string;
}
