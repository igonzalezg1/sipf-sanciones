import { BaseService } from './baseService';
import { appConfig } from 'src/shared/config/app.config';

/**
 * Servicio encargado de cerrar sesión del usuario autenticado.
 * Extiende `BaseService` para reutilizar el método `post`.
 */
export class LogoutService extends BaseService {
  /**
   * Realiza el cierre de sesión llamando al endpoint configurado.
   * Si es exitoso, limpia el almacenamiento local y redirige al login.
   *
   * @returns Una promesa que se resuelve al completar el proceso.
   */
  async logout(): Promise<void> {
    const result = await this.post<{ message: string }>(appConfig.logoutEndpoint);

    if (result && result.message === 'Successfully logged out') {
      // Limpiar storage local
      localStorage.clear();
      sessionStorage.clear();
    } else {
      console.error('Error al cerrar sesión:', result);
    }

    window.location.href = appConfig.loginUrl;
  }
}
