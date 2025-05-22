// src/stores/session.ts
import { defineStore } from 'pinia';
import type { Centro } from 'entities/centro/centro.model';
import type { Persona } from 'entities/persona/persona.model';
import type { User, Permisos } from 'entities/user/user.model';
import type { Expediente } from 'entities/expediente/expediente.model';

/**
 * @name useSessionStore
 * @description
 * Store central de sesión del usuario autenticado.
 * Almacena datos persistentes como el token, el usuario, el centro, la persona, el expediente y los permisos.
 */
export const useSessionStore = defineStore('session', {
  state: () => ({
    token: null as string | null,
    usuario: null as User | null,
    centro: null as Centro | null,
    persona: null as Persona | null,
    permisos: null as Permisos | null,
    expediente: null as Expediente | null,
  }),
  actions: {
    /**
     * Establece el token de autenticación.
     * @param token Token JWT
     */
    setToken(token: string) {
      this.token = token;
    },

    /**
     * Guarda la persona asociada en el store.
     * @param persona Datos de la persona
     */
    setPersona(persona: Persona) {
      this.persona = persona;
    },

    /**
     * Guarda el expediente asociado en el store.
     * @param expediente Datos del expediente
     */
    setExpediente(expediente: Expediente) {
      this.expediente = expediente;
    },

    /**
     * Establece los datos del usuario en el store.
     * @param usuario Usuario autenticado
     */
    setUsuario(usuario: User) {
      this.usuario = usuario;
    },

    /**
     * Establece los permisos del usuario en el store.
     * @param permisos Lista de permisos
     */
    setPermisos(permisos: string[]) {
      this.permisos = permisos;
    },

    /**
     * Establece el centro actual del usuario en el store.
     * @param centro Centro penitenciario
     */
    setCentro(centro: Centro) {
      this.centro = centro;
    },

    /**
     * Carga todos los datos persistentes desde `localStorage` al store.
     * Útil para inicializar el store al iniciar sesión o recargar la app.
     */
    loadFromStorage() {
      const centro = localStorage.getItem('CENTRO');
      const persona = localStorage.getItem('PERSONA');
      const usuario = localStorage.getItem('USUARIO');
      const token = localStorage.getItem('AUTH_TOKEN');
      const permisos = localStorage.getItem('PERMISOS');
      const expediente = localStorage.getItem('EXPEDIENTE');

      if (token) this.setToken(token);
      if (centro) this.setCentro(JSON.parse(centro));
      if (persona) this.setPersona(JSON.parse(persona));
      if (usuario) this.setUsuario(JSON.parse(usuario));
      if (permisos) this.setPermisos(JSON.parse(permisos));
      if (expediente) this.setExpediente(JSON.parse(expediente));
    },
  },
});
