export interface Runner {
    id: string;
    nombre: string;
    posicion: number;
    vueltas_completadas: number;
    mejor_vuelta: number;
    velocidad_promedio: number;
    tiempo_total: string;
    ultima_vuelta: number;
  }