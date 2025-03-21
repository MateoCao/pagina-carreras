import { useEffect, useState } from "react";
import { Runner } from "../types/Runner";

interface AnimatedRowProps {
  runner: Runner;
  runners: Runner[];
  previousSortedIds: string[];
}

export default function AnimatedRow({ runner, runners, previousSortedIds }: AnimatedRowProps) {
  const [animationClass, setAnimationClass] = useState("");
  const [textColor, setColorText] = useState("");

  useEffect(() => {
    const previousIndex = previousSortedIds.indexOf(runner.id) + 1;
    if (previousIndex === -1) return;
    if (runner.posicion !== 0) {
      if (runner.posicion < previousIndex) {
        setAnimationClass("row-move-up");
      } else if (runner.posicion > previousIndex) {
        setAnimationClass("row-move-down");
      }
    }

    // Filtrar valores 0 antes de calcular el mejor tiempo
    const validLapTimes = runners
      .map(r => r.mejor_vuelta)
      .filter(time => time !== 0); // Filtramos los tiempos que sean 0

    const bestLapTime = Math.min(...validLapTimes);

    // Solo se aplica el color púrpura si el mejor tiempo no es 0
    if (runner.mejor_vuelta !== 0 && runner.mejor_vuelta === bestLapTime) {
      setColorText("purple");
    } else {
      setColorText(""); // Si no es el mejor tiempo o es 0, no se aplica el color
    }
  }, [previousSortedIds, runner, runners]);

  return (
    <tr
      className={`hover:bg-gray-700 bg-gray-600 border-b border-gray-800 text-white cursor-pointer ${animationClass}`}
      onAnimationEnd={() => setAnimationClass("")}
    >
      <td className="px-4 py-3">{runner.posicion}</td>
      <td className="px-4 py-3">{runner.nombre}</td>
      <td className="px-4 py-3">{runner.vueltas_completadas}</td>
      <td className="px-4 py-3">{runner.velocidad_promedio}</td>
      <td className="px-4 py-3">{runner.ultima_vuelta}</td>
      <td className="px-4 py-3">{runner.tiempo_total}</td>
      <td className={`px-4 py-3 ${textColor === "purple" ? "text-purple-500 font-bold" : ""}`}>
        {runner.mejor_vuelta}
      </td>
    </tr>
  );
}
