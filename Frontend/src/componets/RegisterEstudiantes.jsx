import { useState, useEffect } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const RegisterEstudiantes = ({ onRegistroExitoso }) => {

    const [form, setform] = useState({
        nombre: "",
        apellido: "",
        curso: "",
        cedulaRepresentante: "",
        cedula: ""
    })

    const [cursos, setCursos] = useState([]);
    const [mensaje, setMensaje] = useState({})

    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/cursos`;
                const token = localStorage.getItem('token');
                const { data } = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setCursos(data);
            } catch (error) {
                setCursos([]);
            }
        };
        obtenerCursos();
    }, []);

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...form,
                curso: form.curso 
            };
            const url =  `${import.meta.env.VITE_BACKEND_URL}/registro-estudiante`;
            const token = localStorage.getItem('token'); 
            const respuesta = await axios.post(url, payload, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({
                nombre: "",
                apellido: "",
                curso: "",
                cedulaRepresentante: "",
                cedula: ""
            });
            if (onRegistroExitoso) onRegistroExitoso(respuesta.data.estudiante || payload);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.error || error.response?.data?.msg || "Error al registrar estudiante", tipo: false });
        }
    };

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
              
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="curso">Curso:</label>
                            <select
                                id="curso"
                                name="curso"
                                value={form.curso || ""}
                                onChange={handleChange}
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            >
                                <option value="">Seleccione un curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso._id} value={curso._id}>
                                        {`${curso.nombre}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedula">Cedula Estudiante:</label>
                            <input type="text" id="cedula" name='cedula'
                                value={form.cedula || ""} onChange={handleChange}
                                placeholder="Ingrese la cedula del estudiante" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedulaRepresentante">Cedula Representante:</label>
                            <input type="text" id="cedulaRepresentante" name='cedulaRepresentante'
                                value={form.cedulaRepresentante || ""} onChange={handleChange}
                                placeholder="Ingresa la cedula del representante" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
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