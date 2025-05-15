// src/stores/session.ts
import { defineStore } from 'pinia';
import type { SancionData } from 'entities/sancion/sancion.model';

export const useIncidenciaStore = defineStore('incidencia', {
  state: () => ({
    sancion_actual: null as SancionData | null,
  }),
  actions: {
    setSancionactual(sancion: SancionData) {
      this.sancion_actual = sancion;
    },

    getSancion() {
      return this.sancion_actual ?? JSON.parse(localStorage.getItem('sancion') ?? '{}');
    },
  },
});
