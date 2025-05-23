// src/stores/session.ts
import { defineStore } from 'pinia';
import type { Persona } from 'entities/persona/persona.model';
import type { Expediente } from 'entities/expediente/expediente.model';

export const useSessionStore = defineStore('session', {
  state: () => ({
    token: null as string | null,
    persona: null as Persona | null,
    expediente: null as Expediente | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('AUTH_TOKEN', token);
    },
    setPersona(persona: Persona) {
      this.persona = persona;
      localStorage.setItem('PERSONA', JSON.stringify(persona));
    },
    setExpediente(expediente: Expediente) {
      this.expediente = expediente;
      localStorage.setItem('EXPEDIENTE', JSON.stringify(expediente));
    },
    loadFromStorage() {
      const token = localStorage.getItem('AUTH_TOKEN');
      const persona = localStorage.getItem('PERSONA');
      const expediente = localStorage.getItem('EXPEDIENTE');

      if (token) this.setToken(token);
      if (persona) this.setPersona(JSON.parse(persona));
      if (expediente) this.setExpediente(JSON.parse(expediente));
    },
  },
});
