import type { RouteRecordRaw } from 'vue-router';
import SancionesJuridicopage from 'src/pages/juridico/SancionesPage.vue';
import SancionesTecnicoPage from 'src/pages/tecnico/SancionesPage.vue';
import SancionesTecnicoCreatePage from 'src/pages/tecnico/SancionCreatePage.vue';
import SancionesJuridicoCreatePage from 'pages/juridico/SancionesCreatePage.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'tecnico',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'tecnico',
        component: SancionesTecnicoPage,
        meta: {
          title: 'Sanciones Técnico',
          requiresAuth: true,
          permisos: ['tecnico-seguridad-sanciones.consulta'],
        },
      },
      {
        path: 'juridico',
        component: SancionesJuridicopage,
        meta: {
          title: 'Sanciones Jurídico',
          requiresAuth: true,
          permisos: ['juridico-sanciones.consulta'],
        },
      },
      {
        path: 'sancion-crear-juridico',
        component: SancionesJuridicoCreatePage,
        meta: {
          title: 'Sanciones Jurídico',
          requiresAuth: true,
          permisos: ['juridico-sanciones.crear'],
        },
      },
      {
        path: 'sancion-crear-tecnico',
        component: SancionesTecnicoCreatePage,
        meta: {
          title: 'Sanciones Técnico',
          requiresAuth: true,
          permisos: ['tecnico-seguridad-sanciones.consulta'],
        },
      },
    ],
  },
  {
    path: '/not-logged',
    component: () => import('pages/errores/NotLogged.vue'),
  },
  {
    path: '/forbidden',
    component: () => import('pages/errores/ErrorForbidden.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/errores/ErrorNotFound.vue'),
  },
];

export default routes;
