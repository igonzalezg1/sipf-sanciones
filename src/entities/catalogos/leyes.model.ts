/**
 * Representa una ley aplicable a una incidencia o sanción.
 */
export interface LeyAplicable {
  id: number;
  ley_aplicable: string;
  nomenclatura: string;
}

/**
 * Artículo perteneciente a una ley aplicable.
 */
export interface ArticuloLey {
  id: number;
  regla: string;
  descripcion: string;
  ley_aplicable_id: number;
}
