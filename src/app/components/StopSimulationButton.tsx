"use client"

const StopSimulationButton = () => {
    const detenerSimulacion = async () => {
        try {
            const response = await fetch("ws://3.15.5.174:5000/detener-simulacion", {
                method: "POST",
            });
            const data = await response.json();
            console.log(data.mensaje);
        } catch (error) {
            console.error("Error al iniciar la simulación:", error);
        }
    };

    return (
        <button
            onClick={detenerSimulacion}
            className="bg-gray-500 text-white px-4 py-2 rounded"
        >
            Detener carrera
        </button>
    );
};

export default StopSimulationButton;