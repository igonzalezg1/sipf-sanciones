<template>
  <!-- Activador -->
  <q-avatar clickable size="37px" class="cursor-pointer" @click="menu = true">
    <img :src="avatarUrl" alt="Avatar" @error="onAvatarError" />
  </q-avatar>

  <!-- Menú dependiente del activador -->
  <q-menu v-model="menu" anchor="bottom right" self="top right" context-menu>
    <q-card style="min-width: 220px" flat>
      <q-card-section class="text-center q-pb-none q-pb-md">
        <div class="text-caption text-grey">Bienvenido a SIPF</div>
        <div class="text-weight-bold">{{ user.name }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="text-center q-pb-none q-pb-md">
        <div class="text-weight-bold q-pb-md">{{ user.tipo }}</div>
        <div class="text-caption text-grey">Rol Asignado:</div>
        <div class="text-weight-bold">{{ user.role.name }}</div>
      </q-card-section>

      <q-separator />

      <q-item clickable v-close-popup @click="emit('logout')" class="justify-center q-pb-md">
        <q-item-section avatar>
          <q-icon name="logout" color="grey" />
        </q-item-section>
        <q-item-section>Cerrar Sesión</q-item-section>
      </q-item>
    </q-card>
  </q-menu>
</template>


/**
* Componente de avatar con menú desplegable de usuario.
*
* Muestra:
* - Avatar del usuario (de URL o generado por `ui-avatars`)
* - Nombre, tipo y rol asignado
* - Opción para cerrar sesión
*
* Props:
* @prop {User} user - Objeto de usuario autenticado con nombre, rol y avatar
*
* Emits:
* @event logout - Evento emitido al hacer clic en "Cerrar Sesión"
*/
<script setup lang="ts">
import { ref } from 'vue';
import type { User } from 'src/entities/user/user.model';

const props = defineProps<{ user: User }>();

const defaultAvatarUrl = 'src/assets/img/avatar.jpg';
const avatarUrl = ref(getAvatarUrl(props.user));

/**
 * Retorna la URL del avatar del usuario.
 * Si tiene una foto, se usa directamente.
 * Si no, se genera un avatar con iniciales.
 *
 * @param {User} user - Usuario autenticado
 * @returns {string} URL del avatar
 */
function getAvatarUrl(user: User) {
  const initials = encodeURIComponent(user.name.trim());

  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
}

/**
 * Reemplaza la imagen de avatar por defecto si falla la carga.
 */
function onAvatarError() {
  avatarUrl.value = defaultAvatarUrl;
}

const menu = ref(false);
const emit = defineEmits(['logout']);
</script>
