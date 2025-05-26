export default {
  tipo_sancion_id: [(val: unknown) => !!val || 'El tipo de sanción es obligatorio'],
  no_sesion_comite: [(val: unknown) => !!val || 'El número de sesión es obligatorio'],
  fecha_registro: [(val: unknown) => !!val || 'La fecha de registro es obligatoria'],
  fecha_hora_inicio_sancion: [
    (val: unknown) => !!val || 'La fecha y hora de inicio es obligatoria',
  ],
  fecha_hora_fin_sancion: [(val: unknown) => !!val || 'La fecha y hora de fin es obligatoria'],
  dias_sancion: [
    (val: unknown) => !!val || 'El número de días de sanción es obligatorio',
    (val: unknown) => {
      if (val && typeof val === 'string') {
        const num = parseInt(val, 10);
        return (!isNaN(num) && num > 0) || 'El número de días debe ser un número positivo';
      }
      return true;
    },
  ],
  observaciones: [],
  descripcion: [(val: unknown) => !!val || 'La descripción es obligatoria'],
  firmante_1_nombre: [(val: unknown) => !!val || 'El nombre del firmante 1 es obligatorio'],
  firmante_1_cargo: [(val: unknown) => !!val || 'El cargo del firmante 1 es obligatorio'],
  firmante_2_nombre: [],
  firmante_2_cargo: [],
};
