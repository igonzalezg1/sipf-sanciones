export interface CentroUser {
  id: number;
  name: string;
  estado: number;
}

export interface RolUser {
  name: string;
  permissions: string[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  photo?: string;
  tipo: string;
  centro?: CentroUser;
  role: RolUser;
}

export type Permisos = string[];
