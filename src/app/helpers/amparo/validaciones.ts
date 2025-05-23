import type { Incidencia } from 'entities/incidente/incidente.model';
import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';
import type { Amparo } from 'entities/amparo/amparo.model';

// Helpers públicos
export function puedeAgregarAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return !tieneResolucionAmparo(incidencia) && !esSuspendida(sancion);
}

export function puedeEditarAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionAmparo(incidencia) && !esSuspendida(sancion) && !amparoEstaEnComite(incidencia)
  );
}

export function puedeVerAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return tieneResolucionAmparo(incidencia) && amparoEstaEnComite(incidencia);
}

export function puedeMandarComiteAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionAmparo(incidencia) && !amparoEstaEnComite(incidencia) && !esSuspendida(sancion)
  );
}

export function puedeAgregarResolucionAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    amparoEstaEnComite(incidencia) &&
    !amparoTieneResolucion(incidencia) &&
    puedeAgregarSolicitudResolucion(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeEditarResolucionAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    amparoEstaEnComite(incidencia) &&
    amparoTieneResolucion(incidencia) &&
    !amparoMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeVerResolucionAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return amparoEstaEnComite(incidencia) && amparoMandadaASeguridad(incidencia);
}

export function puedeMandarSeguridadAmparo(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    amparoEstaEnComite(incidencia) &&
    amparoTieneResolucion(incidencia) &&
    !amparoMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

// 🧩 Funciones internas reutilizables
function getSancion(incidencia: Incidencia): SancionData | null {
  return incidencia.sanciones?.data?.[0] ?? null;
}

function getAmparo(sancion: SancionData | null): Amparo | null {
  return sancion?.amparo ?? null;
}

function esSuspendida(sancion: SancionData): boolean {
  return sancion.etapa_sancion === 'Suspendida';
}

function tieneResolucionAmparo(incidencia: Incidencia): boolean {
  return getSancion(incidencia)?.resolucion_amparo_guardada === true;
}

function amparoEstaEnComite(incidencia: Incidencia): boolean {
  const amparo = getAmparo(getSancion(incidencia));
  return typeof amparo?.en_comite === 'number' && amparo.en_comite >= 1;
}

function amparoTieneResolucion(incidencia: Incidencia): boolean {
  const amparo = getAmparo(getSancion(incidencia));
  return typeof amparo?.en_comite === 'number' && amparo.en_comite > 1 && amparo.en_comite < 3;
}

function puedeAgregarSolicitudResolucion(incidencia: Incidencia): boolean {
  const amparo = getAmparo(getSancion(incidencia));
  return typeof amparo?.en_comite === 'number' && amparo.en_comite < 3;
}

function amparoMandadaASeguridad(incidencia: Incidencia): boolean {
  return getAmparo(getSancion(incidencia))?.en_comite === 3;
}
