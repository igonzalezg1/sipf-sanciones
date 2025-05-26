<template>
  <div class="q-pa-md relative overflow-x-auto">
    <div class="row items-center justify-between q-mb-md">
      <q-input v-model="search" label="Buscar..." dense filled debounce="300" />
    </div>

    <!-- Tabla con scroll horizontal -->
    <q-table
      class="w-full"
      title="Incidencias"
      :rows="filteredRows"
      :columns="columns"
      selection="multiple"
      v-model:selected="selected"
      row-key="id"
      flat
      bordered
      :separator="separator"
      no-data-label="Sin registros encontrados"
      :pagination="pagination"
      :rows-per-page-options="[]"
    >
      <!-- SIN DATA -->
      <template v-slot:no-data>
        <div class="full-width tw-text-lg text-center text-primary q-pa-xs">
          Sin registros encontrados
        </div>
      </template>

      <!-- SLOT: ENCABEZADO CHECKBOX -->
      <template v-slot:header-selection>
        <q-checkbox
          v-model="headerCheckbox"
          color="secondary"
          :disable="esSoloLectura || !haySeleccionables"
          @update:model-value="toggleSeleccionMasiva"
        />
      </template>

      <!-- SLOT: CHECKBOX FILAS -->
      <template v-slot:body-selection="props">
        <q-icon
          v-if="props.row.confirmada_por_comite_tecnico"
          name="check_circle"
          color="primary"
          size="md"
        >
          <q-tooltip>Confirmada por comité técnico</q-tooltip>
        </q-icon>
        <q-icon
          v-else-if="props.row.estatus === 'Sanción no vista por comité técnico'"
          name="cancel"
          color="negative"
          size="md"
        >
          <q-tooltip>No vista por comité técnico</q-tooltip>
        </q-icon>

        <!-- Solo se puede seleccionar si no es solo lectura -->
        <q-checkbox
          v-else-if="!esSoloLectura"
          v-model="props.selected"
          color="secondary"
          @update:model-value="() => (props as any)['__qtable_toggleSelect']?.(props.row)"
        />
      </template>

      <!-- TOLTIP -->
      <template v-slot:body-cell-tipo="props">
        <q-td :props="props">
          <span>{{ props.row.descripcionCorta }}</span>
          <q-tooltip v-if="props.row.descripcionCompleta !== props.row.descripcionCorta">
            {{ props.row.descripcionCompleta }}
          </q-tooltip>
        </q-td>
      </template>

      <!-- ESTATUS -->
      <template v-slot:body-cell-estatus="props">
        <q-td :props="props">
          <q-badge :color="estatusColor(props.row.estatus)" class="q-px-sm q-py-xs">
            {{ props.row.estatus }}
          </q-badge>
        </q-td>
      </template>

      <!-- ACCIONES -->
      <template v-slot:body-cell-acciones="props">
        <q-td align="center">
          <q-btn
            v-for="accion in getAcciones(props.row)"
            :key="accion.emit"
            dense
            round
            flat
            :color="accion.color"
            v-permiso="accion.permiso"
            :icon="accion.icon"
            :title="accion.label"
            @click="emit(accion.emit, props.row)"
            class="q-mx-xs"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'IncidenciasTable' });

import { ref, computed, watch } from 'vue';
import type { QTableColumn } from 'quasar';
import type { Incidencia } from 'entities/incidente/incidente.model';

const search = ref('');
const pagination = ref({
  page: 1,
  rowsPerPage: 6,
});
const separator = 'horizontal';

const props = defineProps<{ rows: Incidencia[]; permisos: string[]; esSoloLectura?: boolean }>();
const permisos = props.permisos ?? [];

const selected = ref<Incidencia[]>([]);
const emit = defineEmits<(e: 'ver' | 'sancion' | 'proceso', incidencia: Incidencia) => void>();

const headerCheckbox = ref(false);

// Evaluar qué filas se pueden seleccionar
const filasSeleccionables = computed(() =>
  filteredRows.value.filter((row) => !row.confirmada_por_comite_tecnico && !row.sancion_sin_efecto),
);

// ¿Hay filas seleccionables?
const haySeleccionables = computed(() => filasSeleccionables.value.length > 0);

// Selección masiva de las filas válidas
function toggleSeleccionMasiva(val: boolean) {
  headerCheckbox.value = val;
  selected.value = val ? filasSeleccionables.value : [];
}

/**
 * Determina el color del badge de estatus según el valor del estatus.
 * @param {string} estatus - El estatus de la incidencia
 * @returns {string} - Color asociado al estatus
 */
function estatusColor(estatus: string) {
  switch (estatus?.toLowerCase()) {
    case 'registrado':
      return 'grey';
    case 'pendiente de enviar':
      return 'orange';
    case 'pendiente de atención por jurídico':
      return 'deep-orange';
    case 'en atención':
      return 'amber';
    case 'en atención (comité técnico)':
      return 'amber-8';
    case 'con resolución del comité técnico':
      return 'indigo';
    case 'atendido por jurídico':
      return 'green';
    case 'sanción no vista por comité técnico':
      return 'blue-grey';
    case 'sin estatus definido':
      return 'grey-5';
    default:
      return 'grey';
  }
}

watch(
  () => props.rows,
  () => {
    // fuerza recálculo si fuera necesario, o para depurar
    // console.log('Se actualizaron las rows')
  },
  { deep: true, immediate: true },
);

/**
 * Filtra las filas por texto ingresado en el input de búsqueda.
 * El filtro es sensible a texto de cualquier campo visible en la tabla.
 */
const filteredRows = computed(() => {
  const mapped = props.rows.map((row) => ({
    fecha: row.fecha_hora_registro,
    custodia: row.persona_registra,
    juridico_asigna: row.usuario_asigna ?? 'Sin asignar',
    descripcionCompleta: row.tipo_incidente_descripcion || 'Sin descripción',
    descripcionCorta:
      row.tipo_incidente_descripcion && row.tipo_incidente_descripcion.length > 30
        ? row.tipo_incidente_descripcion.slice(0, 30) + '...'
        : row.tipo_incidente_descripcion,
    ...row,
  }));

  return mapped.filter((row) =>
    Object.values(row).some(
      (val) =>
        (typeof val === 'string' || typeof val === 'number') &&
        String(val).toLowerCase().includes(search.value.toLowerCase()),
    ),
  );
});

const baseColumns: QTableColumn[] = [
  { name: 'folio', label: 'Folio Sanción', field: 'folio', align: 'left' },
  { name: 'numero_reporte', label: 'Número de Reporte', field: 'numero_reporte', align: 'left' },
  { name: 'fecha', label: 'Fecha y Hora', field: 'fecha', align: 'left' },
  { name: 'tipo', label: 'Tipo de Incidencia', field: 'descripcionCorta', align: 'left' },
  { name: 'custodia', label: 'Personal de Custodia', field: 'custodia', align: 'left' },
  { name: 'estatus', label: 'Estatus de Incidencia', field: 'estatus', align: 'left' },
];

const mostrarColumnaAcciones = computed(() => {
  const permisosNecesarios = [
    'juridico-sanciones.crear',
    'juridico-sanciones.consulta',
    'juridico-sanciones.edicion',
    'juridico-sanciones.detalle',
    'juridico-sanciones.adjuntar-documentos',
  ];
  return permisosNecesarios.some((p) => permisos.includes(p));
});

/**
 * Determina si se debe mostrar la columna de acciones,
 * dependiendo de los permisos asignados al usuario en sesión.
 */
const columns = computed<QTableColumn[]>(() => {
  if (mostrarColumnaAcciones.value) {
    return [
      ...baseColumns,
      { name: 'acciones', label: 'Acciones', field: () => '', align: 'center' },
    ];
  }
  return baseColumns;
});

type EmitEventosPermitidos = 'ver' | 'sancion' | 'proceso';

function getAcciones(row: Incidencia) {
  const acciones: {
    label: string;
    icon: string;
    color: string;
    emit: EmitEventosPermitidos;
    permiso?: string;
  }[] = [];

  const tienePermiso = (permiso?: string) => {
    return !permiso || permisos.includes(permiso);
  };

  // Siempre permitir "Ver"
  if (tienePermiso('juridico-sanciones.detalle')) {
    acciones.push({
      label: 'Ver Incidencia',
      icon: 'visibility',
      color: 'primary',
      emit: 'ver',
      permiso: 'juridico-sanciones.detalle',
    });
  }

  // Si tiene sanción sin efecto → solo Ver
  if (row.sancion_sin_efecto) {
    return acciones;
  }

  // Si fue enviada pero NO confirmada → solo Ver
  if (row.enviado && !row.confirmada_por_comite_tecnico) {
    return acciones;
  }

  if (tienePermiso('juridico-sanciones.detalle')) {
    acciones.push({
      label: 'Ver Procesos de la Sanción',
      icon: 'assignment',
      color: 'blue-8',
      emit: 'proceso',
      permiso: 'juridico-sanciones.detalle',
    });
  }

  return acciones;
}
</script>
