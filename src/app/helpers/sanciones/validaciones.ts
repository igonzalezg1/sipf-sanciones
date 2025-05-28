import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';

export function eneableControversia(sancion: SancionData): boolean {
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

export function eneableDownloadDocument(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  let isDownload = false;

  if (sancion) {
    if (incidencia) {
      // Verificar si no hay archivo de sanción y la incidencia no está atendida
      const hasNoFileAndNotAttended = !sancion.sancion_file && incidencia.atendido == 0;
      // Verificar permisos del consejo técnico
      const hasConsejoTecnicoAccess =
        // this.auth.hasOnePermission('consejo-tecnico-sanciones') &&
        incidencia.revisa_consejo_tecnico == true;

      // Verificar permisos jurídicos
      const hasJuridicoAccess =
        // this.auth.hasOnePermission('juridico-sanciones') &&
        incidencia.revisa_consejo_tecnico == false;
      isDownload = hasNoFileAndNotAttended && (hasConsejoTecnicoAccess || hasJuridicoAccess);
    }
  }

  return isDownload;
}

export function eneableShowDocument(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  let isShow = false;

  if (sancion) {
    if (incidencia) {
      const hasFile =
        sancion?.sancion_file != null &&
        sancion.sancion_file !== '' &&
        !!sancion.sancion_file !== false;
      isShow = hasFile;
    }
  }

  return isShow;
}

export function eneableSendSecurity(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  let isSendSecurity = false;

  if (sancion) {
    if (incidencia) {
      // Verificar condiciones del archivo y etapa
      const hasFileAndPending: boolean =
        !!sancion.sancion_file && sancion.etapa_sancion === 'Pendiente de envío a seguridad';
      // Verificar permiso para enviar a seguridad
      const canSendToSecurity = sancion.puede_mandar_seguridad === true;
      isSendSecurity = hasFileAndPending && canSendToSecurity;
    }
  }

  return isSendSecurity;
}

export function eneableEditSancion(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  const noFile = !sancion.sancion_file;
  const notAttended = incidencia.atendido == 0;
  // return noFile && notAttended && isJuridicoPath && (canEditByConsejo || canEditByJuridico);
  return noFile && notAttended;
}
