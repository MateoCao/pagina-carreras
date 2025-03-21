export default function TableHeader() {
  return (
    <thead className="bg-gray-700 text-white">
      <tr>
        <th className="px-4 py-2 text-left">Posición</th>
        <th className="px-4 py-2 text-left">Nombre</th>
        <th className="px-4 py-2 text-left">Vueltas Completadas</th>
        <th className="px-4 py-2 text-left">Velocidad Promedio (m/s)</th>
        <th className="px-4 py-2 text-left">Último Tiempo (s)</th>
        <th className="px-4 py-2 text-left">Tiempo Total (s)</th>
        <th className="px-4 py-2 text-left">Mejor Vuelta (s)</th>
      </tr>
    </thead>
  );
}
