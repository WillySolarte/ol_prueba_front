export type LoginFormData = {
    correo: string;
    contrasena: string;
    terminos: boolean;
}

export type LoginData = {
    correo: string;
    contrasena: string;
}

export type ActiveData = {
    nombre: string;
    rol: string;
}

export type TEditBs = {
  nombre: string,
  correo?: string,
  estado: boolean,
  telefono?: string,
  municipio: number,
  fechaRegistro: string,
}

export type TCreateBusinessman = {
  nombre: string,
  correo?: string,
  estado: boolean,
  telefono?: string,
  municipio: string,
  fechaRegistro: string,
}