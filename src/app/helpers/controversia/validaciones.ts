import type { Incidencia } from 'entities/incidente/incidente.model';
import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';

export function puedeAgregarControversia(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  const tiene_resolucion = !incidencia.sanciones.data[0].resolucion_controversia_guardada;
  const es_suspendida = !esSuspendida(sancion);

  return tiene_resolucion && es_suspendida;
}

export function puedeEditarControversia(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;
  const tiene_resolucion = incidencia.sanciones.data[0].resolucion_controversia_guardada;

  return tiene_resolucion && !esSuspendida(sancion) && !esComite(incidencia);
}

export function puedeVerControversia(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  const tiene_resolucion = incidencia.sanciones.data[0].resolucion_controversia_guardada;
  return tiene_resolucion && mandadoComite(incidencia);
}

export function puedeMandarComite(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  const tiene_resolucion = incidencia.sanciones.data[0].resolucion_controversia_guardada;
  return tiene_resolucion && !esComite(incidencia) && !esSuspendida(sancion);
}

export function puedeAgregarResolucion(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  const tiene_resolucion = !incidencia.sanciones.data[0].resolucion_apelacion_guardada;
  return (
    esComite(incidencia) &&
    !tieneResolucion(incidencia) &&
    tiene_resolucion &&
    agregaSolicitud(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeEditarResolucion(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    esComite(incidencia) &&
    tieneResolucion(incidencia) &&
    !estaSeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeVerResolucion(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  return esComite(incidencia) && tieneResolucionShow(incidencia);
}

export function puedeMandarSeguridad(sancion: SancionData): boolean {
  const incidenciaStore = useIncidenciaStore();
  const incidencia = incidenciaStore.getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    esComite(incidencia) &&
    tieneResolucion(incidencia) &&
    !estaSeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

// Funciones internas
function esSuspendida(sancion: SancionData): boolean {
  return sancion.etapa_sancion === 'Suspendida';
}

function esComite(incidencia: Incidencia): boolean {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion?.resolucion_controversia_guardada) {
    const controversia = sancion.controversia;
    if (controversia && typeof controversia.en_comite === 'number' && controversia.en_comite >= 1) {
      isReturn = true;
    }
  }

  return isReturn;
}

function mandadoComite(incidencia: Incidencia) {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion?.resolucion_controversia_guardada) {
    const controversia = sancion.controversia;
    if (
      controversia &&
      typeof controversia.en_comite === 'number' &&
      controversia?.en_comite >= 1
    ) {
      isReturn = true;
    }
  }
  return isReturn;
}

function tieneResolucion(incidencia: Incidencia): boolean {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion?.resolucion_controversia_guardada) {
    const controversia = sancion.controversia;
    if (
      controversia &&
      typeof controversia.en_comite === 'number' &&
      controversia.en_comite > 1 &&
      controversia.en_comite < 3
    ) {
      isReturn = true;
    }
  }

  return isReturn;
}

function agregaSolicitud(incidencia: Incidencia): boolean {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion) {
    const controversia = sancion.controversia;
    if (controversia && typeof controversia.en_comite === 'number' && controversia.en_comite < 3) {
      isReturn = true;
    }
  }
  return isReturn;
}

function estaSeguridad(incidencia: Incidencia): boolean {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion) {
    if (sancion.resolucion_controversia_guardada) {
      if (sancion.controversia.en_comite === 3) {
        isReturn = true;
      }
    }
  }
  return isReturn;
}

function tieneResolucionShow(incidencia: Incidencia): boolean {
  let isReturn = false;
  const sancion = incidencia.sanciones?.data?.[0];
  if (sancion) {
    const controversia = sancion.controversia;
    if (sancion.resolucion_controversia_guardada) {
      if (controversia.en_comite == 3) {
        isReturn = true;
      }
    }
  }

  return isReturn;
}
