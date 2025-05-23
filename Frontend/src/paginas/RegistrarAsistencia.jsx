import React, { useState } from 'react'
import { AsignarPonderaciones } from '../componets/AsignarPonderaciones'
import { FechaAnio } from '../componets/FechaAnio'
import axios from 'axios'
import Mensaje from '../componets/Alertas/Mensajes'

const RegistrarAsistencia = () => {
    const [mensaje, setMensaje] = useState({});
    const [mostrarFechaFin, setMostrarFechaFin] = useState(false);
    const [mostrarPonderaciones, setMostrarPonderaciones] = useState(false);
    const [mostrarTerminarPeriodo, setMostrarTerminarPeriodo] = useState(false);

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
        setMostrarTerminarPeriodo(true);
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
            setMostrarTerminarPeriodo(false);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.error || "Error al finalizar el año lectivo.", tipo: false });
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

            {!mostrarFechaFin && !mostrarPonderaciones && !mostrarTerminarPeriodo && (
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 mb-6"
                    onClick={handleIniciarPeriodo}
                >
                    Iniciar Año Lectivo
                </button>
            )}

            {mostrarFechaFin && (
                <FechaAnio
                    onFechaFinRegistrada={handleFechaFinRegistrada}
                />
            )}

            {mostrarPonderaciones && (
                <AsignarPonderaciones
                    onPonderacionesAsignadas={handlePonderacionesAsignadas}
                />
            )}

            {mostrarTerminarPeriodo && (
                <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 mt-6"
                    onClick={handleTerminarPeriodo}
                >
                    Finalizar Año Lectivo
                </button>
            )}
        </div>
    )
}

export default RegistrarAsistencia