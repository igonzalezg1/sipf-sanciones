export default {
  cuando_aplica: [(val: unknown) => !!val || 'Debe seleccionar cuándo aplica la controversia'],
  fecha_solicitud: [(val: unknown) => !!val || 'La fecha de admisión es obligatoria'],
  numero_sesion: [(val: unknown) => !!val || 'El número de sesión es obligatorio'],
  organo_jurisdiccional: [(val: unknown) => !!val || 'El órgano jurisdiccional es obligatorio'],
  observaciones: [],
  controversia_file: [(val: unknown) => !!val || 'Debe subir el archivo de la controversia (PDF)'],
};
