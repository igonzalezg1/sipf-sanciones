<template>
  <router-view />
</template>

/** * Punto de entrada de la aplicación. * Inicializa el estado de sesión (`sessionStore`) a partir
de parámetros en la URL o de variables de entorno (.env). * * Esta lógica permite interoperabilidad
con otros sistemas que pueden inyectar un `token`, `persona`, `expediente`, * `usuario`, `permisos`
y `centro` como parámetros GET, o usar valores por defecto desde variables de entorno. * * @module
AppInit */
<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSessionStore } from 'stores/session';

const session = useSessionStore();
const currentEnv = import.meta.env.VITE_APP_ENV ?? 'LOCAL';

/**
 * Extrae parámetros desde la URL o usa valores definidos en variables de entorno (.env).
 * Luego, carga esos valores en el `sessionStore`.
 */
onBeforeMount(() => {
  const params = new URLSearchParams(window.location.search);

  const hasParams =
    params.has('token') ||
    params.has('persona') ||
    params.has('usuario') ||
    params.has('permisos') ||
    params.has('centro') ||
    params.has('expediente');

  if (!hasParams) {
    if (currentEnv === 'LOCAL') {
      const personaStr = params.get('persona');
      const expedienteStr = params.get('expediente');
      const usuarioStr = params.get('usuario');
      const permisosStr = params.get('permisos');
      const centroStr = params.get('centro');

      const personaParam = personaStr ? JSON.parse(decodeURIComponent(personaStr)) : null;
      const expedienteParam = expedienteStr ? JSON.parse(decodeURIComponent(expedienteStr)) : null;
      const usuarioParam = usuarioStr ? JSON.parse(decodeURIComponent(usuarioStr)) : null;
      const permisosParam = permisosStr ? JSON.parse(decodeURIComponent(permisosStr)) : null;
      const centroParam = centroStr ? JSON.parse(decodeURIComponent(centroStr)) : null;

      // Carga desde .env si no vienen por URL
      const token = import.meta.env.VITE_AUTH_TOKEN;
      let persona = personaParam;
      let expediente = expedienteParam;
      let usuario = usuarioParam;
      let permisos = permisosParam;
      let centro = centroParam;

      try {
        centro = JSON.parse(import.meta.env.VITE_CENTRO);
      } catch (err) {
        console.error('❌ Error al parsear VITE_CENTRO', err);
      }

      try {
        persona = JSON.parse(import.meta.env.VITE_PERSONA);
      } catch (err) {
        console.error('❌ Error al parsear VITE_PERSONA', err);
      }

      try {
        expediente = JSON.parse(import.meta.env.VITE_EXPEDIENTE);
      } catch (err) {
        console.error('❌ Error al parsear VITE_EXPEDIENTE', err);
      }

      try {
        usuario = JSON.parse(import.meta.env.VITE_USUARIO);
      } catch (err) {
        console.error('❌ Error al parsear VITE_USUARIO', err, import.meta.env.VITE_USUARIO);
      }

      try {
        permisos = JSON.parse(import.meta.env.VITE_PERMISOS || '[]');
      } catch (err) {
        console.error('❌ Error al parsear VITE_PERMISOS', err, import.meta.env.VITE_PERMISOS);
      }

      if (token) session.setToken(token);
      if (centro) session.setCentro(centro);
      if (persona) session.setPersona(persona);
      if (usuario) session.setUsuario(usuario);
      if (permisos?.length) session.setPermisos(permisos);
      if (expediente) session.setExpediente(expediente);
    } else {
      session.loadFromStorage();
    }
  }
});
</script>
