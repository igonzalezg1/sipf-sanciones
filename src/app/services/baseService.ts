import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { useSessionStore } from 'stores/session';

/**
 * Respuesta estándar para peticiones paginadas.
 *
 * @template T Tipo de datos contenidos en la respuesta.
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  };
}

/**
 * Servicio base que encapsula llamadas HTTP comunes (GET, POST, PUT, DELETE) usando Axios.
 * También gestiona la cabecera de autorización y el manejo de errores centralizado.
 */
export class BaseService {
  protected api = api;
  protected session = useSessionStore();

  constructor() {
    this.setAuthHeader();
  }

  /**
   * Establece la cabecera Authorization con el token actual del store, si existe.
   */
  private setAuthHeader() {
    const token = this.session.token;
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  /**
   * Realiza una petición HTTP GET.
   *
   * @template T Tipo de respuesta esperada.
   * @param url - URL del endpoint.
   * @param params - Parámetros opcionales de la query.
   * @returns Datos recibidos o `null` si ocurre un error.
   */
  async get<T>(url: string, params?: Record<string, unknown>): Promise<T | null> {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  /**
   * Realiza una petición HTTP POST.
   *
   * @template T Tipo de respuesta esperada.
   * @template D Tipo de datos enviados (payload).
   * @param url - URL del endpoint.
   * @param data - Datos enviados en el body.
   * @returns Datos recibidos o `null` si ocurre un error.
   */
  async post<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  /**
   * Realiza una petición HTTP PUT.
   *
   * @template T Tipo de respuesta esperada.
   * @template D Tipo de datos enviados (payload).
   * @param url - URL del endpoint.
   * @param data - Datos enviados en el body.
   * @returns Datos recibidos o `null` si ocurre un error.
   */
  async put<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  /**
   * Realiza una petición HTTP PATCH.
   *
   * @template T Tipo de respuesta esperada.
   * @template D Tipo de datos enviados.
   * @param url - Endpoint.
   * @param data - Payload.
   * @returns Respuesta o null si falla.
   */
  async patch<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.patch<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  /**
   * Realiza una petición HTTP DELETE.
   *
   * @template T Tipo de respuesta esperada.
   * @param url - URL del endpoint.
   * @returns Datos recibidos o `null` si ocurre un error.
   */
  async delete<T>(url: string): Promise<T | null> {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  /**
   * Realiza una petición paginada (POST) con el número de página y filtros adicionales.
   *
   * @template T Tipo de cada elemento en la lista paginada.
   * @param url - URL del endpoint.
   * @param page - Número de página.
   * @param extraParams - Filtros o parámetros adicionales.
   * @returns Respuesta paginada o `null` si ocurre un error.
   */
  async paginate<T>(
    url: string,
    page = 1,
    extraParams: Record<string, unknown> = {},
  ): Promise<PaginatedResponse<T> | null> {
    return this.post<PaginatedResponse<T>>(url, { page, ...extraParams });
  }

  /**
   * Maneja errores de forma centralizada y muestra una notificación.
   *
   * @param error - Error capturado durante la petición HTTP.
   */
  private handleError(error: unknown) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    } else {
      console.error('API Error:', error);
    }
    console.error('API Error:', error);
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
      'Error en la petición';
    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
      timeout: 4000,
    });
  }
}
