// src/stores/session.ts
import { defineStore } from 'pinia';
import type { Incidencia } from 'entities/incidente/incidente.model';

export const useIncidenciaStore = defineStore('incidencia', {
  state: () => ({
    incidencia_actual: null as Incidencia | null,
  }),
  actions: {
    setIncidencia(incidencia: Incidencia) {
      this.incidencia_actual = incidencia;
    },

    getIncidencia() {
      return this.incidencia_actual ?? JSON.parse(localStorage.getItem('incidencia') ?? '{}');
    },
  },
});
