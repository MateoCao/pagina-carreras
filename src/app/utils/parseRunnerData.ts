import { RawRunner } from "../types/RawRunner";
import { Runner } from "../types/Runner";
export const parseRunnerData = (raw: RawRunner): Runner => ({
    id: String(raw.number ?? ""), 
    nombre: raw.name ?? "Desconocido",
    posicion: raw.position ?? 0, 
    vueltas_completadas: raw.laps ?? 0,
    mejor_vuelta: parseFloat((Number(raw.best_lap) || 0).toFixed(3)), 
    velocidad_promedio: parseFloat((raw.average_speed || 0).toFixed(2)),
    tiempo_total: raw.total_time ?? "00:00:00",
    ultima_vuelta: parseFloat((raw.last_lap_time || 0).toFixed(3)), 
});