export interface Product {
    id?: any; // Opcional para que pueda no estar presente en nuevos productos
    codigo: string;
    categoria: string;
    descripcion: string;
    descripcionDetallada: string;
    marca: string;
    precio: number;
    imagenUrl?: string; // Opcional para la URL de la imagen
    existencias: {
      [sucursal: string]: number;
    };
  }
  