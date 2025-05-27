import React, { useState } from 'react'
import { AsignarPonderaciones } from '../componets/AsignarPonderaciones'
import { FechaAnio } from '../componets/FechaAnio'
import axios from 'axios'
import Mensaje from '../componets/Alertas/Mensajes'

const RegistrarAsistencia = () => {
    const [mensaje, setMensaje] = useState({});
    const [mostrarFechaFin, setMostrarFechaFin] = useState(false);
    const [mostrarPonderaciones, setMostrarPonderaciones] = useState(false);
    const [mostrarModal, setMostrarModal] = useState(false);

    const handleIniciarPeriodo = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/iniciar-periodo`;
            const token = localStorage.getItem('token');
            const { data } = await axios.post(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensaje({ respuesta: data.msg || "Año lectivo iniciado correctamente.", tipo: true });
            setMostrarFechaFin(true);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.error || "Error al iniciar el año lectivo.", tipo: false });
        }
    };

    const handleFechaFinRegistrada = () => {
        setMostrarFechaFin(false);
        setMostrarPonderaciones(true);
    };

    const handlePonderacionesAsignadas = () => {
        setMostrarPonderaciones(false);
    };

    const handleTerminarPeriodo = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/terminar-periodo`;
            const token = localStorage.getItem('token');
            const { data } = await axios.patch(url, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensaje({ respuesta: data.msg || "Año lectivo finalizado correctamente.", tipo: true });
            setMostrarModal(false);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.error || "Error al finalizar el año lectivo.", tipo: false });
            setMostrarModal(false);
        }
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Año Lectivo</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo permite gestionar los años lectivos</p>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}

            {/* Botón Iniciar Año Lectivo */}
            {!mostrarFechaFin && !mostrarPonderaciones && (
                <div className="mb-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                        onClick={handleIniciarPeriodo}
                    >
                        Iniciar Año Lectivo
                    </button>
                </div>
            )}

            {/* Botón Finalizar Año Lectivo siempre visible y separado */}
            <div className="mb-6">
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                    onClick={() => setMostrarModal(true)}
                >
                    Finalizar Año Lectivo
                </button>
            </div>

            {/* Modal de confirmación */}
            {mostrarModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4 text-center">¿Está seguro que desea finalizar el año lectivo?</h2>
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={() => setMostrarModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                                onClick={handleTerminarPeriodo}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {mostrarFechaFin && (
                <FechaAnio
                    onFechaFinRegistrada={handleFechaFinRegistrada}
                    formato="YYYY-MM-DD"
                />
            )}

            {mostrarPonderaciones && (
                <AsignarPonderaciones
                    onPonderacionesAsignadas={handlePonderacionesAsignadas}
                />
            )}
        </div>
    )
}

export default RegistrarAsistencia