<template>
  <div class="row">
    <div class="col-12">
      <form>
        <div class="row q-mx-md">
          <div class="col-12">
            <p class="tw-text-2xl">INCIDENCIA</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <p class="tw-text-lg q-mx-md tw-uppercase">
              <span class="tw-font-semibold">Tipo de incidencia: </span
              >{{ dataForm.tipo_incidencia }}
            </p>
            <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
              <span class="tw-font-semibold">Folio de incidencia:</span>
              {{ dataForm.folio_incidencia }}
            </p>
          </div>
          <div class="col-6">
            <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
              <span class="tw-font-semibold">Fecha y Hora de incidente: </span
              >{{ dataForm.fecha_incidente }}
            </p>
            <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
              <span class="tw-font-semibold">Personal que custodia: </span
              >{{ dataForm.personal_custodia }}
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <p class="tw-text-lg q-mx-md tw-uppercase tw-font-semibold">
              <span class="tw-font-semibold">Descripción de la incidencia: </span
              >{{ dataForm.descripcion_incidencia }}
            </p>
          </div>
        </div>

        <div class="row q-mx-md">
          <div class="col-12">
            <p class="tw-text-2xl">SANCION</p>
          </div>
        </div>
        <div class="row tw-uppercase">
          <div class="col-6">
            <q-select
              filled
              v-model="dataForm.tipo_sancion_id"
              label="Tipo de sanción"
              type="number"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.fecha_hora_inicio_sancion"
              label="Fecha inicio de sanción"
              type="date"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.fecha_hora_fin_sancion"
              label="Fecha fin de sanción"
              type="date"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.fecha_hora_fin_sancion"
              label="Lugar de aplicacion de la sanción"
              type="textarea"
              class="q-ma-md"
            />
          </div>
          <div class="col-6">
            <q-input
              filled
              v-model="dataForm.fecha_incidente"
              label="Fecha de sanción"
              type="text"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.personal_custodia"
              label="Fecha real de fin de sanción"
              type="text"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.dias_sancion"
              label="Días de sanción"
              type="number"
              class="q-ma-md"
            />
            <q-input
              filled
              v-model="dataForm.descripcion"
              label="Descripción de la sanción"
              type="textarea"
              class="q-ma-md tw-uppercase"
            />
          </div>
        </div>
        <div class="row tw-uppercase">
          <div class="col-12">Involucrados</div>
          <table class="q-table">
            <thead class="text-center bg-primary text-white">
              <tr>
                <th>#</th>
                <th>PPL</th>
                <th>Expediente</th>
                <th>Tipo de participación</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nombre PPL</td>
                <td>Expediente</td>
                <td>Tipo de participación</td>
                <td>
                  <q-toggle v-model="dataForm.firmante_2_cargo" color="primary" class="q-ma-md" />
                </td>
              </tr>
              <!-- <tr v-for="(involucrado, index) in dataForm.involucrados" :key="index">
                <td>{{ involucrado.nombre }}</td>
                <td>{{ involucrado.cargo }}</td>
                <td>
                  <q-btn
                    color="negative"
                    icon="delete"
                    @click="dataForm.involucrados.splice(index, 1)"
                  />
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
        <div class="row tw-uppercase">
          <div class="col-3">
            <q-input
              filled
              v-model="dataForm.firmante_1_nombre"
              label="Nombre del firmante 1"
              type="text"
              class="q-ma-sm"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              v-model="dataForm.firmante_1_cargo"
              label="Cargo del firmante 1"
              type="text"
              class="q-ma-sm"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              v-model="dataForm.firmante_2_nombre"
              label="Nombre del firmante 2"
              type="text"
              class="q-ma-sm"
            />
          </div>
          <div class="col-3">
            <q-input
              filled
              v-model="dataForm.firmante_2_cargo"
              label="Cargo del firmante 2"
              type="text"
              class="q-ma-sm"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="col-12">
      <q-btn
        v-if="sancionId == 0"
        class="q-mt-md"
        color="primary"
        label="Crear Sanción"
        to="/sanciones-crear"
        icon="add"
      />
    </div>
  </div>
  <div class="row" v-if="sancionId > 0">
    <div class="col-12">
      <q-stepper v-model="step" vertical color="primary" animated>
        <q-step :name="1" title="OPCIONES DE SANCION" icon="settings" :done="step > 1">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-h6 text-center bg-primary text-white"
                >Sanción</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn @click="step = 2" color="primary" label="Continuar" />
          </q-stepper-navigation>
        </q-step>

        <q-step
          :name="2"
          title="OPCIONES CONTROVERSIA"
          caption="Optional"
          icon="create_new_folder"
          :done="step > 2"
        >
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-h6 text-center bg-primary text-white"
                >CONTROVERSIA</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn @click="step = 4" color="primary" label="Continuar" />
            <q-btn flat @click="step = 1" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>

        <q-step :name="4" title="OPCIONES APELACION" icon="add_comment">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-h6 text-center bg-primary text-white"
                >APELACION</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn @click="step = 5" color="primary" label="Continuar" />
            <q-btn flat @click="step = 2" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
        <q-step :name="5" title="OPCIONES AMPARO" icon="add_comment">
          <q-card>
            <q-card-header>
              <q-toolbar-title class="text-h6 text-center bg-primary text-white"
                >AMPARO</q-toolbar-title
              >
            </q-card-header>
            <q-card-section class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" label="Ver sancion" icon="visibility" />
              <q-btn class="q-mx-lg" color="primary" label="Ver documento" icon="description" />
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <q-btn color="primary" label="Finalizar" />
            <q-btn flat @click="step = 4" color="primary" label="Ver anterior" class="q-ml-sm" />
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { SancionCreate } from 'src/entities/sancion/sancion.model';

const route = useRoute();
const step = ref(1);
const sancionId = ref(0);
const dataForm: SancionCreate = {
  tipo_incidencia: 0,
  fecha_incidente: '',
  folio_incidencia: '',
  personal_custodia: '',
  descripcion_incidencia: '',
  tipo_sancion_id: '',
  fecha_registro: '',
  fecha_hora_inicio_sancion: '',
  fecha_hora_fin_sancion: '',
  dias_sancion: '',
  fecha_hora_fin_real_sancion: '',
  lugar_aplicacion: '',
  descripcion: '',
  firmante_1_nombre: '',
  firmante_1_cargo: '',
  firmante_2_nombre: '',
  firmante_2_cargo: '',
};
onMounted(() => {
  if (route.query.incidenciaId) {
    sancionId.value = Number(route.query.incidenciaId);
  } else {
    sancionId.value = 0;
  }
});
</script>
<style scoped></style>
