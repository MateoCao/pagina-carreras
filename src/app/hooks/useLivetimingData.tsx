import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Runner } from "../types/Runner";
import { RawRunner } from "../types/RawRunner";
import { formatTime } from "../utils/formatTime";
import { parseRunnerData } from "../utils/parseRunnerData";
import { sortRunners } from "../utils/sortRunners";

export const useLiveTimingData = () => {
    const [runners, setRunners] = useState<Runner[]>([]);
    const previousSortedIds = useRef<string[]>([]);
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tiempoTranscurrido, setTiempoTranscurrido] = useState("00:00");

    useEffect(() => {
        // Configuración del socket
        const socket = io("wss://livetimingxml.serveftp.com", {
            transports: ["websocket"],
            reconnection: true,
            autoConnect: true,
            timeout: 5000
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("🟢 Conectado al servidor");
            setIsLoading(false);
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            console.log("🔴 Desconectado");
            setIsLoading(false);
            setIsConnected(false);
        });

        socket.on("update", (data:  { data: {results: RawRunner[]}, timestamp: number }) => {

            try {
                const formattedTime = formatTime(data.timestamp);
                setTiempoTranscurrido(formattedTime);
                console.log(data);
                const processed = data.data.results.map(parseRunnerData);
                const sorted = sortRunners(processed);
                
                setRunners(prev => {
                    const prevIds = prev.map(r => r.id);

                    previousSortedIds.current = prevIds;
                    return sorted;
                });
            } catch (error) {
                console.error("Error procesando datos:", error);
            }
        });

        socket.on("connect_error", (err) => {
            setIsLoading(false);
            console.error("Error de conexión:", err.message);
        });

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log("Socket desconectado");
            }
        };
    }, []);

    return {
        runners,
        isLoading,
        previousSortedIds: previousSortedIds.current,
        isConnected,
        tiempoTranscurrido
    };
};
