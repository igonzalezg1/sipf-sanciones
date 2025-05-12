<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { useSessionStore } from 'stores/session';

const session = useSessionStore();

onBeforeMount(() => {
  // session.$reset();
  // session.loadFromStorage();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const persona = params.get('persona')
    ? JSON.parse(decodeURIComponent(params.get('persona')!))
    : null;
  const expediente = params.get('expediente')
    ? JSON.parse(decodeURIComponent(params.get('expediente')!))
    : null;

  session.setToken(token ?? '');
  session.setPersona(persona);
  session.setExpediente(expediente);
});

watch(
  () => session.token,
  (val) => {
    console.log('Token:', val);
  },
);
</script>
