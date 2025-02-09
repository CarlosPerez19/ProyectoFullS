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
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate() + 1);
        return `${year}/${month}/${day}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedForm = {
            ...form,
            fecha: formatFecha(form.fecha)
            
        };

        try {
            const url =  `${import.meta.env.VITE_BACKEND_URL}/justificar-inasistencia`;
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
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
              
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedula">Cedula:</label>
                            <input type="text" id="cedula" name='cedula'
                                value={form.cedula || ""} onChange={handleChange}
                                placeholder="Ingresa la cedula del estudiante" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="fecha">Fecha:</label>
                            <input type="date" id="fecha" name='fecha'
                                value={form.fecha || ""} onChange={handleChange}
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label
                                htmlFor='justificacion'
                                className='text-gray-700 uppercase font-bold text-sm'>Justificacion: </label>
                            <textarea
                                id='justificacion'
                                type="text"
                                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5'
                                placeholder='Ingrese la justificación'
                                name='justificacion'
                                value={form.justificacion}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <button className=" bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-al mt-4">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}