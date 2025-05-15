import { api } from 'boot/axios';
import axios, { AxiosError } from 'axios';
import { Notify } from 'quasar';
import { useSessionStore } from 'stores/session';

export class BaseService {
  protected api = api;
  protected session = useSessionStore();

  constructor() {
    this.setAuthHeader();
  }

  private setAuthHeader() {
    const token = this.session.token;
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  async get<T>(url: string, params?: unknown): Promise<T | null> {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        this.handleError(error);
      } else {
        this.handleError(new Error('Unknown error occurred'));
      }
      return null;
    }
  }

  async post<T>(url: string, data?: unknown): Promise<T | null> {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error('Unknown error occurred'));
      }
      return null;
    }
  }

  async put<T>(url: string, data?: unknown): Promise<T | null> {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error('Unknown error occurred'));
      }
      return null;
    }
  }

  async patch<T>(url: string, data?: unknown): Promise<T | null> {
    try {
      const response = await this.api.patch<T>(url, data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error('Unknown error occurred'));
      }
      return null;
    }
  }

  async delete<T>(url: string): Promise<T | null> {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error('Unknown error occurred'));
      }
      return null;
    }
  }

  private handleError(error: unknown) {
    console.error('API Error:', error);

    let message = 'Error en la petición';

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as { message?: string };

      message = responseData?.message || axiosError.message || message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    Notify.create({
      type: 'negative',
      message,
    });
  }
}
