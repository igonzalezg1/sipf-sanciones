<template>
  <q-dialog>
    <q-card>
      <q-card-section class="q-pt-none">
        <div class="text-h6">Detalles de la sanción</div>
      </q-card-section>

      <q-card-section>
        <slot />
      </q-card-section>

      <q-card-actions vertical class="justify-end">
        <q-btn label="Cerrar" color="primary" @click="$emit('close')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts"></script>
