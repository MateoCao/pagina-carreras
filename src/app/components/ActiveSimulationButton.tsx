"use client"

const IniciarSimulacionButton = () => {
    const iniciarSimulacion = async () => {
        try {
            const response = await fetch("ws://3.15.5.174:5000/iniciar-simulacion", {
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
            onClick={iniciarSimulacion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Iniciar carrera
        </button>
    );
};

export default IniciarSimulacionButton;