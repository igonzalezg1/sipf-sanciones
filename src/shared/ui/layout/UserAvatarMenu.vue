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

<script setup lang="ts">
import { ref } from 'vue';
import type { User } from 'src/entities/user/user.model';

const props = defineProps<{ user: User }>();

const defaultAvatarUrl = 'src/assets/img/avatar.jpg';
const avatarUrl = ref(getAvatarUrl(props.user));

function getAvatarUrl(user: User) {
  if (user.photo) return user.photo;
  const initials = encodeURIComponent(user.name.trim());
  return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff`;
}

function onAvatarError() {
  avatarUrl.value = defaultAvatarUrl;
}

const menu = ref(false);
const emit = defineEmits(['logout']);
</script>
