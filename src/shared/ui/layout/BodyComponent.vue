<template>
  <q-card class="card-custom">
    <router-view />
  </q-card>
</template>

<style scoped>
.card-custom {
  border-radius: 12px;
  box-shadow: 0 10px 64px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 10px 3px -1px rgba(0, 0, 0, 0.12);
}
</style>