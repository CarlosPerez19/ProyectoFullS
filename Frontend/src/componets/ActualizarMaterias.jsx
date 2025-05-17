import { useState, useEffect } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const ActualizarMaterias = () => {
    // paso 1 
    const [form, setform] = useState({
        curso: '',
        nombre: '',
        cedulaProfesor: ''
    })

    const [cursos, setCursos] = useState([]) 
    const [mensaje, setMensaje] = useState({}) 
    // paso 2
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    
    useEffect(() => {
        const obtenerCursos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/cursos`
                const token = localStorage.getItem('token'); 
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setCursos(respuesta.data) 
            } catch (error) {
                console.error("Error al obtener los cursos:", error)
                toast.error("No se pudieron cargar los cursos.")
            }
        }
        obtenerCursos()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(form) 
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro-materia`;
            const token = localStorage.getItem('token');
            const respuesta = await axios.post(url, form, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({ curso: '', nombre: '', cedulaProfesor: '' }); 
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || "Error al registrar la materia", tipo: false });
        }
    };

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}


                    <form onSubmit={handleSubmit}>
                        {/* Combobox para Curso */}
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="curso">Curso:</label>
                            <select
                                id="curso"
                                name="curso"
                                value={form.curso}
                                onChange={handleChange}
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            >
                                <option value="">Selecciona un curso</option>
                                {cursos.map((curso) => (
                                    <option key={curso._id} value={curso._id}>
                                        {`Nivel ${curso.nivel} - Paralelo ${curso.paralelo}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Nombre:</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={form.nombre || ""}
                                onChange={handleChange}
                                placeholder="Ingresa el nombre de la materia"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedulaProfesor">Cédula Profesor:</label>
                            <input
                                type="text"
                                id="cedulaProfesor"
                                name="cedulaProfesor"
                                value={form.cedulaProfesor || ""}
                                onChange={handleChange}
                                placeholder="Ingresa la cédula del profesor asignado a la materia"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            />
                        </div>

                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all mt-4">
                                Registrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}