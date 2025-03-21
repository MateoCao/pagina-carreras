import { Runner } from "../types/Runner";

export const sortRunners = (runners: Runner[]) =>
    [...runners].sort((a, b) => {
        if (a.posicion === 0 && b.posicion !== 0) return 1;
        if (a.posicion !== 0 && b.posicion === 0) return -1;
        return a.posicion - b.posicion;
});