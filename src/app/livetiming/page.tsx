"use client"
import { useLiveTimingData } from "../hooks/useLivetimingData";
import TimingTable from "../components/TimingTable";
import LoadingSpinner from "../components/LoadingSpinner";

export default function LiveTiming() {
  const { runners, isLoading, previousSortedIds, isConnected } = useLiveTimingData();

  if (isLoading) return <LoadingSpinner />

  if (!isConnected && !isLoading) return (
    <div className="w-full h-full flex items-center justify-center">
      <h2 className="text-2xl font-bold">Actualmente no hay eventos disponibles</h2>
    </div>
  )

  return (
    <div className="container w-fit flex flex-col items-center justify-center mx-auto p-4">
      <div className="flex justify-between w-full items-center mb-4">
        <h2 className="text-2xl font-bold">NOMBRE</h2>
        <div className={`px-4 py-2 rounded-md ${
          isConnected ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}>
          {isConnected ? "Conectado" : "Desconectado"}
        </div>
      </div>
      <TimingTable 
        runners={runners}
        previousSortedIds={previousSortedIds}
      />
    </div>
  );
}