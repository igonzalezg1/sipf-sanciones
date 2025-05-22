<template>
  <div v-if="isLoading" class="loading-overlay">
    <q-spinner-gears color="primary" size="10em" />
  </div>
  <div class="row">
    <div class="col-12">
      <p class="text-xl text-center">LISTA DE INCIDENCIAS</p>
    </div>
  </div>
  <div class="row">
    <div class="col-12 q-my-md">
      <q-input dark dense standout v-model="search" input-class="text-right" class="q-ml-md">
        <template v-slot:append>
          <q-icon v-if="search === ''" name="search" />
          <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
        </template>
      </q-input>
    </div>
  </div>
  <div class="row" v-if="Object.keys(selected).length > 0">
    <div class="col-12">
      <q-btn
        color="primary"
        label="Marcar sanciones a no visto (por comite)"
        class="q-ma-md"
        @click="sendNoVisto"
      />
      <q-btn
        color="primary"
        label="Marcar enviado a comite tecnico"
        class="q-ma-md"
        @click="enviarComite"
      />
    </div>
  </div>
  <div class="row" v-if="!isLoading">
    <div class="col-12">
      <table class="q-table">
        <thead class="text-center bg-primary text-white">
          <tr>
            <th class="">
              <q-checkbox color="primary" v-model="checkbox" />
            </th>
            <th class="">Folio</th>
            <th class="">Fecha y hora</th>
            <th class="">Tipo de incidencia</th>
            <th class="">Personal que custodia</th>
            <th class="">Cargo del personal</th>
            <th class="">Estatus de incidencia</th>
            <th class="">Acciones</th>
          </tr>
        </thead>
        <tbody v-if="data.length > 0">
          <tr v-for="(incidencia, index) in data" :key="index">
            <td>
              <q-icon
                v-if="
                  incidencia.estatus == 'Sanción no vista por comité técnico' ||
                  incidencia.confirmada_por_comite_tecnico === 1
                "
                name="check_circle"
                size="2em"
                color="primary"
              />
              <q-checkbox
                v-if="
                  incidencia.estatus === 'Sanción no vista por comité técnico' ||
                  incidencia.confirmada_por_comite_tecnico !== 1
                "
                color="secondary"
                :model-value="selected[incidencia.id] === true"
                @update:model-value="(val) => handleCheckboxChange(incidencia.id, val)"
              />
            </td>
            <td>{{ incidencia.folio }}</td>
            <td>{{ incidencia.fecha_hora_registro }}</td>
            <td>{{ incidencia.tipo_incidente_descripcion }}</td>
            <td>{{ incidencia.persona_registra }}</td>
            <td>{{ incidencia.persona_registra_cargo }}</td>
            <td>{{ incidencia.estatus }}</td>
            <td>
              <q-btn color="secondary" icon="visibility">
                <q-tooltip class="bg-secondary">Ver incidencia</q-tooltip>
              </q-btn>
              <q-btn
                color="secondary"
                icon="import_contacts"
                v-if="incidencia.confirmada_por_comite_tecnico === 1"
                @click="verSancion(incidencia)"
              >
                <q-tooltip class="bg-secondary">Ver sancion</q-tooltip>
              </q-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="text-center">No hay datos disponibles</td>
          </tr>
        </tbody>
      </table>

      <q-pagination
        v-model="page"
        :max="pagination.total_pages"
        :max-pages="5"
        boundary-numbers
        direction-links
        class="q-mt-md full-width flex justify-center"
        color="primary"
        @update:model-value="loadPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
// Stores
import { useSessionStore } from 'stores/session';
import { useIncidenciaStore } from 'stores/incidencias';
// Modelos
import type { Incidencia } from 'entities/incidente/incidente.model';
// Servicios
import { IncidenciasService } from 'src/app/services/sanciones/IncidenciasService';

// Variables
const isLoading = ref(true);
const service = new IncidenciasService();
const page = ref(1);
const $q = useQuasar();
const data = ref<Incidencia[]>([]);
const pagination = ref();
const search = ref('');
const checkbox = false;
const selected = ref<Record<number, boolean>>({});
const sessionStore = useSessionStore();
const incidenciaStore = useIncidenciaStore();
const scope = ref({});
const router = useRouter();

// Funciones
onMounted(async () => {
  try {
    scope.value = {
      porExpedienteEnviado: sessionStore.expediente?.id,
      // rutaAccesso: 'juridico-sanciones',
    };
    const include = 'sanciones,involucrados_para_sancion';
    // const include = `sanciones:persona_id(${sessionStore.persona?.id}),involucrados_para_sancion`;
    const response = await service.getIncidencias(include, scope.value);
    if (response?.data) {
      data.value = response.data;
    }
    pagination.value = response?.meta.pagination;
  } catch (error: unknown) {
    let message = 'Error inesperado';
    if (error instanceof Error) {
      message = error.message;
    }

    $q.notify({
      type: 'negative',
      message,
    });
  } finally {
    isLoading.value = false;
  }
});

async function loadPage() {
  isLoading.value = true;
  try {
    scope.value = {
      porExpedienteEnviado: sessionStore.expediente?.id,
      // rutaAccesso: 'juridico-sanciones',
    };
    const include = 'sanciones,involucrados_para_sancion';
    // const include = `sanciones:persona_id(${sessionStore.persona?.id}),involucrados_para_sancion`;
    const response = await service.getIncidencias(include, scope.value);
    if (response?.data) {
      data.value = response.data;
    }
    pagination.value = response?.meta.pagination;
    page.value = pagination.value.current_page;
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: (error as Error).message,
    });
  } finally {
    isLoading.value = false;
  }
}

async function sendNoVisto() {
  isLoading.value = true;
  const ids = Object.keys(selected.value)
    .filter((key) => selected.value[Number(key)])
    .map(Number);
  await service.marcarNoVisto(ids);
  await loadPage();
  isLoading.value = false;
}

async function enviarComite() {
  isLoading.value = true;
  const ids = Object.keys(selected.value)
    .filter((key) => selected.value[Number(key)])
    .map(Number);
  await service.enviarComite(ids);
  await loadPage();
  isLoading.value = false;
}

function handleCheckboxChange(id: number, checked: boolean) {
  if (checked) {
    selected.value[id] = true;
  } else {
    delete selected.value[id];
  }
}

async function verSancion(incidencia: Incidencia) {
  incidenciaStore.setIncidencia(incidencia);
  localStorage.setItem('incidencia', JSON.stringify(incidencia));
  if (incidencia.sanciones && incidencia.sanciones.data && incidencia.sanciones.data.length > 0) {
    localStorage.setItem('sanciones', JSON.stringify(incidencia.sanciones.data[0]));
  } else {
    localStorage.setItem('sanciones', JSON.stringify(null));
  }
  await router.push('/sanciones-juridico-crear');
}
</script>
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); /* negro con transparencia */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
