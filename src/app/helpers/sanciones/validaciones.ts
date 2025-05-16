import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';

export function eneableControversia(sancion: SancionData) {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  let isControversia = false;
  if (sancion) {
    if (incidencia) {
      if (
        incidencia?.estatus === 'Con resolución del comité técnico' &&
        sancion?.etapa_sancion === 'Enviado a seguridad' &&
        sancion?.estatus_sancion === 'Con efecto'
      ) {
        isControversia = true;
      }

      if (
        incidencia?.estatus === 'En atención' ||
        incidencia?.estatus === 'Con resolución del comité técnico'
      ) {
        isControversia = true;
      }

      if (sancion?.etapa_sancion === 'Pendiente de envío a comité técnico') {
        isControversia = true;
      }

      if (sancion?.pasaron_tres_dias_sancion) {
        isControversia = false;
      }
    }
  }

  return isControversia;
}
