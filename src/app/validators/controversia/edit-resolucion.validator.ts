export default {
  fecha_resolucion: [(val: unknown) => !!val || 'La fecha de resolución es obligatoria'],
  fecha_inicio_sancion: [
    (val: unknown) => !!val || 'La fecha de inicio de la sanción es obligatoria',
  ],
  fecha_fin_sancion: [(val: unknown) => !!val || 'La fecha de fin de la sanción es obligatoria'],
  fecha_suspencion: [],
  observaciones_resolucion: [], // opcional
  resolucion_juez: [(val: unknown) => !!val || 'La resolución del juez es obligatoria'],
  controversia_resolucion_file: [
    (val: unknown) => !!val || 'Debe subir el archivo de resolución de controversia',
  ],
};
