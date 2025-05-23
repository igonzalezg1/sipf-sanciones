import type { Incidencia } from 'entities/incidente/incidente.model';
import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';
import type { Apelacion } from 'entities/apelacion/apelacion.model';

// Helpers públicos
export function puedeAgregarApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return !tieneResolucionApelacion(incidencia) && !esSuspendida(sancion);
}

export function puedeEditarApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionApelacion(incidencia) &&
    !esSuspendida(sancion) &&
    !apelacionEstaEnComite(incidencia)
  );
}

export function puedeVerApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return tieneResolucionApelacion(incidencia) && apelacionEstaEnComite(incidencia);
}

export function puedeMandarComiteApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionApelacion(incidencia) &&
    !apelacionEstaEnComite(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeAgregarResolucionApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    apelacionEstaEnComite(incidencia) &&
    !apelacionTieneResolucion(incidencia) &&
    !tieneResolucionAmparo(incidencia) &&
    puedeAgregarSolicitudResolucion(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeEditarResolucionApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    apelacionEstaEnComite(incidencia) &&
    apelacionTieneResolucion(incidencia) &&
    !apelacionMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeVerResolucionApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return apelacionEstaEnComite(incidencia) && apelacionMandadaASeguridad(incidencia);
}

export function puedeMandarSeguridadApelacion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    apelacionEstaEnComite(incidencia) &&
    apelacionTieneResolucion(incidencia) &&
    !apelacionMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

// 🧩 Funciones internas reutilizables
function getSancion(incidencia: Incidencia): SancionData | null {
  return incidencia.sanciones?.data?.[0] ?? null;
}

function getApelacion(sancion: SancionData | null): Apelacion | null {
  return sancion?.apelacion ?? null;
}

function esSuspendida(sancion: SancionData): boolean {
  return sancion.etapa_sancion === 'Suspendida';
}

function tieneResolucionApelacion(incidencia: Incidencia): boolean {
  return getSancion(incidencia)?.resolucion_apelacion_guardada === true;
}

function tieneResolucionAmparo(incidencia: Incidencia): boolean {
  return getSancion(incidencia)?.resolucion_amparo_guardada === true;
}

function apelacionEstaEnComite(incidencia: Incidencia): boolean {
  const apelacion = getApelacion(getSancion(incidencia));
  return typeof apelacion?.en_comite === 'number' && apelacion.en_comite >= 1;
}

function apelacionTieneResolucion(incidencia: Incidencia): boolean {
  const apelacion = getApelacion(getSancion(incidencia));
  return (
    typeof apelacion?.en_comite === 'number' && apelacion.en_comite > 1 && apelacion.en_comite < 3
  );
}

function puedeAgregarSolicitudResolucion(incidencia: Incidencia): boolean {
  const apelacion = getApelacion(getSancion(incidencia));
  return typeof apelacion?.en_comite === 'number' && apelacion.en_comite < 3;
}

function apelacionMandadaASeguridad(incidencia: Incidencia): boolean {
  return getApelacion(getSancion(incidencia))?.en_comite === 3;
}
