import { useEffect, useState } from 'react'
import axios from 'axios';
import Mensaje from './Alertas/Mensajes'

export const JustifyInasistencia = () => {

    const [form, setform] = useState({
        cedula: "",
        justificacion: "",
        fecha: ""
    })

    const [mensaje, setMensaje] = useState({})

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const formatFecha = (fecha) => {
        const [year, month, day] = fecha.split('-');
        return `${year}/${month}/${day}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedForm = {
            ...form,
            fecha: formatFecha(form.fecha)
            
        };
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/justificar-inasistencia`;
            const token = localStorage.getItem('token');

            const respuesta = await axios.patch(url, formattedForm, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({ cedula: "", justificacion: "", fecha: "" });
            
        } catch (error) {
            setMensaje({ respuesta: error.response.data.error, tipo: false });
        }
        
    };

    return (
        <div className="flex justify-center items-center min-h-[60vh] bg-gradient-to-br from-gray-100 to-gray-300 py-6">
            <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md border border-slate-200">
                {Object.keys(mensaje).length > 0 && (
                    <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-gray-700 uppercase font-bold text-sm mb-1 block" htmlFor="cedula">
                            Cédula del Estudiante:
                        </label>
                        <input
                            type="text"
                            id="cedula"
                            name="cedula"
                            value={form.cedula || ""}
                            onChange={handleChange}
                            placeholder="Cédula del estudiante"
                            className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 uppercase font-bold text-sm mb-1 block" htmlFor="fecha">
                            Fecha de Inasistencia:
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={form.fecha || ""}
                            onChange={handleChange}
                            className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="justificacion"
                            className="text-gray-700 uppercase font-bold text-sm mb-1 block"
                        >
                            Justificación:
                        </label>
                        <textarea
                            id="justificacion"
                            name="justificacion"
                            value={form.justificacion}
                            onChange={handleChange}
                            placeholder="Ingrese la justificación"
                            className="border-2 w-full p-2 mt-1 placeholder-gray-400 rounded-md min-h-[90px] text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <button
                            className="bg-blue-600 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-blue-800 transition-all mt-1 shadow text-base"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}