// src/stores/session.ts
import { defineStore } from 'pinia';
import type { Incidencia } from 'entities/incidente/incidente.model';

export const useIncidenciaStore = defineStore('incidencia', {
  state: () => ({
    incidencia_actual: null as Incidencia | null,
  }),
  actions: {
    setIncidencia(incidencia: Incidencia | null) {
      if (incidencia) {
        this.incidencia_actual = incidencia;
        localStorage.setItem('incidencia', JSON.stringify(incidencia));
      }
    },

    getIncidencia() {
      return this.incidencia_actual ?? JSON.parse(localStorage.getItem('incidencia') ?? '{}');
    },
  },
});
