import { api } from 'boot/axios';
import { Notify } from 'quasar';

/**
 * Respuesta estándar para peticiones paginadas.
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
 * Servicio base genérico para peticiones HTTP.
 */
export class BaseService {
  protected api = api;
  protected token: string | null = null;

  constructor(token: string | null = null) {
    this.token = token;
    this.setAuthHeader();
  }

  private setAuthHeader() {
    if (this.token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    }
  }

  async get<T>(url: string, params?: Record<string, unknown>): Promise<T | null> {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  async post<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  async put<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  async patch<T, D = unknown>(url: string, data?: D): Promise<T | null> {
    try {
      const response = await this.api.patch<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  async delete<T>(url: string): Promise<T | null> {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error: unknown) {
      this.handleError(error);
      return null;
    }
  }

  async paginate<T>(
    url: string,
    page = 1,
    extraParams: Record<string, unknown> = {},
  ): Promise<PaginatedResponse<T> | null> {
    return this.post<PaginatedResponse<T>>(url, { page, ...extraParams });
  }

  private handleError(error: unknown) {
    const message =
      (error as { response?: { data?: { message?: string } } })?.response?.data?.message ??
      'Error en la petición';

    console.error('API Error:', error);

    Notify.create({
      type: 'negative',
      message,
      position: 'top-right',
      timeout: 4000,
    });
  }
}
