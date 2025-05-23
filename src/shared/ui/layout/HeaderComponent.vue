<template>
  <q-header elevated class="bg-topbar-sipf text-white shadow-2">
    <div class="flex h-full w-full items-center justify-between flex-wrap gap-2">
      <!-- LOGO -->
      <div class="flex items-center px-2 shrink-0 h-full">
        <q-btn flat dense round @click="refreshHome" class="logo-custom">
          <img :src="ImgLogo" alt="Logo" class="h-10 sm:h-16" />
        </q-btn>
      </div>

      <!-- CENTRO + RELOJ centrado -->
      <div class="flex items-center flex-grow justify-center h-full hidden-xs">
        <CentroRelojComponent :centro="centro" />
      </div>

      <!-- AVATAR alineado al extremo derecho -->
      <div class="flex items-center px-2 shrink-0 h-full">
        <UserAvatarMenu v-if="props.user" :user="props.user" @logout="logout" />
      </div>
    </div>
  </q-header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ImgLogo from 'src/assets/img/logo.png';
import type { User } from 'src/entities/user/user.model';
import UserAvatarMenu from 'src/shared/ui/UserAvatarMenu.vue';
import type { Centro } from 'src/entities/centro/centro.model';
import { LogoutService } from 'src/app/services/LogoutService';
import CentroRelojComponent from 'src/shared/ui/CentroRelojComponent.vue';

/**
 * Componente Header principal de la aplicación.
 *
 * Muestra:
 * - Logo que refresca la ruta principal al hacer clic.
 * - Nombre del centro y reloj (oculto en pantallas pequeñas).
 * - Menú de usuario con opción de logout.
 *
 * Props:
 * - `user`: Datos del usuario autenticado.
 * - `centro`: Datos del centro asociado.
 */
const props = defineProps<{
  user?: User;
  centro: Centro;
}>();
const router = useRouter();

/**
 * Refresca la página principal reemplazando la ruta actual.
 *
 * @returns Promise que se resuelve al completar la navegación.
 */
function refreshHome() {
  router.replace('/').catch((error) => {
    console.error('Error al refrescar la página de inicio:', error);
  });
}

/**
 * Cierra la sesión del usuario usando `LogoutService`
 * y redirige al login configurado.
 *
 * @returns Promise que se resuelve cuando finaliza el proceso.
 */
async function logout() {
  const service = new LogoutService();
  await service.logout();
}
</script>

<style scoped>
.bg-topbar-sipf {
  background-color: #1a5c50;
  height: auto;
  min-height: 70px;
  padding: 0.5rem;
}

.logo-custom {
  width: 106.29px;
}

/* Oculta el centro y reloj en pantallas pequeñas */
@media (max-width: 600px) {
  .hidden-xs {
    display: none !important;
  }
}
</style>
