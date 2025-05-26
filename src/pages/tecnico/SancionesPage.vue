<template>
  <div class="q-pa-md">
    <SancionesTable
      :permisos="sessionStore.permisos ?? []"
      :rows="incidencias"
      :pagination="pagination"
      :esSoloLectura="true"
      @sancion="verSancion"
      @ver="abrirFormulario"
      @request="(params: any) => onPaginationChanged(params)"
    />

    <IncidenciaShowModal ref="modalVer" />
  </div>
</template>

<script setup lang="ts">
import { Notify } from 'quasar';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import SancionesTable from 'src/widgets/TableSancionesTecnico.vue';
import type { PaginatedResponse } from 'src/app/services/baseService';
import { useSessionStore } from 'src/stores/session';
import { useIncidenciaStore } from 'src/stores/incidencias';
import { IncidenciaService } from 'src/app/services/IncidenciaService';
import type { Incidencia } from 'entities/incidente/incidente.model';
import IncidenciaShowModal from 'src/features/incidencias/show/IncidenciaShowModal.vue';

const sessionStore = useSessionStore();
const incidenciaStore = useIncidenciaStore();
const incidenciaService = new IncidenciaService(sessionStore.token);
const router = useRouter();
const modalVer = ref();

const loading = ref(false);
const paginaActual = ref(1);
const incidencias = ref<Incidencia[]>([]);
const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

/**
 * Carga la lista de incidencias desde el backend con paginación.
 */
async function cargarIncidencias(goToFirstPage = false) {
  if (goToFirstPage) {
    paginaActual.value = 1;
    pagination.value.page = 1;
  }

  loading.value = true;

  const persona = sessionStore.persona;
  const expediente = sessionStore.expediente;

  const params: Record<string, unknown> = {};

  if (persona?.id && expediente?.id) {
    params.scope = { porExpedienteEnviado: expediente.id };
    params.include = `sanciones:persona_id(${persona.id}),involucrados_para_sancion`;
  } else {
    params.scope = { porCentro: sessionStore.centro?.id ?? 0 };
    params.include = 'sanciones,involucrados_para_sancion';
  }

  try {
    const response: PaginatedResponse<Incidencia> | null =
      await incidenciaService.getIncidenciasPaginadas(paginaActual.value, params);

    if (response) {
      incidencias.value = response.data;
      pagination.value = {
        ...pagination.value,
        page: response.meta.pagination.current_page,
        rowsPerPage: response.meta.pagination.per_page,
        rowsNumber: response.meta.pagination.total,
      };
    }
  } catch (error) {
    console.error('Error al cargar incidencias:', error);
    Notify.create({
      type: 'negative',
      message: 'Error al cargar las incidencias',
      position: 'top-right',
      timeout: 4000,
    });
  } finally {
    loading.value = false;
  }
}

function onPaginationChanged(params: { pagination: { page: number; rowsPerPage: number } }) {
  pagination.value.page = params.pagination.page;
  paginaActual.value = params.pagination.page;
  cargarIncidencias().catch(console.error);
}

onMounted(async () => {
  await cargarIncidencias();
});

async function verSancion(incidencia: Incidencia) {
  incidenciaStore.setIncidencia(incidencia);
  localStorage.setItem('incidencia', JSON.stringify(incidencia));

  const sancion = incidencia.sanciones?.data?.[0] ?? null;
  localStorage.setItem('sanciones', JSON.stringify(sancion));

  await router.push('/sancion/crear');
}

function abrirFormulario(incidencia: Incidencia) {
  modalVer.value?.open(incidencia);
}
</script>
