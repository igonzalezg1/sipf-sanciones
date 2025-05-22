import type { Incidencia } from 'entities/incidente/incidente.model';
import type { SancionData } from 'src/entities/sancion/sancion.model';
import { useIncidenciaStore } from 'src/stores/incidencias';
import type { Controversia } from 'entities/controversia/controversia.model';

// Helpers públicos
export function puedeAgregarControversia(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return !tieneResolucionControversia(incidencia) && !esSuspendida(sancion);
}

export function puedeEditarControversia(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionControversia(incidencia) &&
    !esSuspendida(sancion) &&
    !controversiaEstaEnComite(incidencia)
  );
}

export function puedeVerControversia(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return tieneResolucionControversia(incidencia) && controversiaEstaEnComite(incidencia);
}

export function puedeMandarComite(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    tieneResolucionControversia(incidencia) &&
    !controversiaEstaEnComite(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeAgregarResolucion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    controversiaEstaEnComite(incidencia) &&
    !controversiaTieneResolucion(incidencia) &&
    !tieneResolucionApelacion(incidencia) &&
    puedeAgregarSolicitudResolucion(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeEditarResolucion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    controversiaEstaEnComite(incidencia) &&
    controversiaTieneResolucion(incidencia) &&
    !controversiaMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

export function puedeVerResolucion(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return controversiaEstaEnComite(incidencia) && controversiaMandadaASeguridad(incidencia);
}

export function puedeMandarSeguridad(sancion: SancionData): boolean {
  const incidencia = useIncidenciaStore().getIncidencia();
  if (!sancion || !incidencia) return false;

  return (
    controversiaEstaEnComite(incidencia) &&
    controversiaTieneResolucion(incidencia) &&
    !controversiaMandadaASeguridad(incidencia) &&
    !esSuspendida(sancion)
  );
}

// 🧩 Funciones internas reutilizables
function getSancion(incidencia: Incidencia): SancionData | null {
  return incidencia.sanciones?.data?.[0] ?? null;
}

function getControversia(sancion: SancionData | null): Controversia | null {
  return sancion?.controversia ?? null;
}

function esSuspendida(sancion: SancionData): boolean {
  return sancion.etapa_sancion === 'Suspendida';
}

function tieneResolucionControversia(incidencia: Incidencia): boolean {
  return getSancion(incidencia)?.resolucion_controversia_guardada === true;
}

function tieneResolucionApelacion(incidencia: Incidencia): boolean {
  return getSancion(incidencia)?.resolucion_apelacion_guardada === true;
}

function controversiaEstaEnComite(incidencia: Incidencia): boolean {
  const controversia = getControversia(getSancion(incidencia));
  return typeof controversia?.en_comite === 'number' && controversia.en_comite >= 1;
}

function controversiaTieneResolucion(incidencia: Incidencia): boolean {
  const controversia = getControversia(getSancion(incidencia));
  return (
    typeof controversia?.en_comite === 'number' &&
    controversia.en_comite > 1 &&
    controversia.en_comite < 3
  );
}

function puedeAgregarSolicitudResolucion(incidencia: Incidencia): boolean {
  const controversia = getControversia(getSancion(incidencia));
  return typeof controversia?.en_comite === 'number' && controversia.en_comite < 3;
}

function controversiaMandadaASeguridad(incidencia: Incidencia): boolean {
  return getControversia(getSancion(incidencia))?.en_comite === 3;
}
