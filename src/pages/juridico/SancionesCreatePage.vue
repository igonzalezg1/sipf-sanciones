<template>
  <div class="row">
    <div class="col-12">
      <form>
        <div class="row q-mx-md">
          <div class="col-12">
            <p class="text-xl">INCIDENCIA</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-select
              filled
              v-model="dataForm.tipo_incidencia"
              label="Tipo de incidencia"
              type="number"
              class="q-ma-md"
            />
            <q-input
              filled
              readonly
              v-model="dataForm.folio_incidencia"
              label="Folio de incidencia"
              type="text"
              class="q-ma-md"
            />
          </div>
          <div class="col-6">
            <q-input
              filled
              readonly
              v-model="dataForm.fecha_incidente"
              label="Fecha y Hora de incidente"
              type="text"
              class="q-ma-md"
            />
            <q-input
              filled
              readonly
              v-model="dataForm.personal_custodia"
              label="Personal que custodia"
              type="text"
              class="q-ma-md"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              filled
              readonly
              v-model="dataForm.descripcion_incidencia"
              label="Descripción de la incidencia"
              type="text"
              class="q-ma-md"
            />
          </div>
        </div>

        <div class="row q-mx-md">
          <div class="col-12">
            <p class="text-xl">SANCION</p>
          </div>
        </div>
        <div class="row">
          <div class="col-6">
            <q-select
              filled
              v-model="dataForm.tipo_incidencia"
              label="Tipo de incidencia"
              type="number"
              class="q-ma-md"
            />
            <q-input
              filled
              readonly
              v-model="dataForm.folio_incidencia"
              label="Folio de incidencia"
              type="text"
              class="q-ma-md"
            />
          </div>
          <div class="col-6">
            <q-input
              filled
              readonly
              v-model="dataForm.fecha_incidente"
              label="Fecha y Hora de incidente"
              type="text"
              class="q-ma-md"
            />
            <q-input
              filled
              readonly
              v-model="dataForm.personal_custodia"
              label="Personal que custodia"
              type="text"
              class="q-ma-md"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <q-input
              filled
              readonly
              v-model="dataForm.descripcion_incidencia"
              label="Descripción de la incidencia"
              type="text"
              class="q-ma-md"
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
  <div class="row">
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
  sancionId.value = Number(route.query.incidenciaId);
});
</script>
<style scoped></style>
