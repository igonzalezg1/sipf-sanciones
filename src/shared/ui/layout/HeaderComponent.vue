<template>
  <q-header elevated class="tw-bg-emerald-900 text-white">
    <q-toolbar class="q-pa-sm items-center">
      <div class="row items-center no-wrap">
        <img :src="ImgLogo" class="img-logo q-mr-sm" />
        <span class="text-h6">{{ props.titulo }}</span>
      </div>
      <MenuComponent />
      <q-space />

      <q-avatar size="32px" class="cursor-pointer">
        <img :src="Avatar" />
      </q-avatar>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import ImgLogo from 'src/assets/img/logo.png';
import Avatar from 'src/assets/img/avatar.jpg';
import MenuComponent from './MenuComponent.vue';

const props = withDefaults(
  defineProps<{
    titulo?: string;
  }>(),
  {
    titulo: 'Home',
  },
);
</script>
<style scoped>
.img-logo {
  width: 80px;
  display: block;
}
</style>
