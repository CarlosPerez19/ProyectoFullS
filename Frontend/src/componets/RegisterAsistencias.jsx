import { useEffect, useState } from 'react';
import axios from 'axios';
import Mensaje from './Alertas/Mensajes';

export const RegisterAsistencias = () => {
    const [form, setform] = useState({
        curso: "",
        asistencias: {}
    });

    const [mensaje, setMensaje] = useState({});
    const [cursos, setCursos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    useEffect(() => {
        // Fetch cursos from the backend
        const fetchCursos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/cursos`;
                const token = localStorage.getItem('token'); // Obtén el token de localStorage
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                    }
                });
                setCursos(respuesta.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCursos();
    }, []);

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleCursoChange = async (e) => {
        const cursoId = e.target.value;
        setCursoSeleccionado(cursoId);
        setform({ ...form, curso: cursoId });
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/cursos/${cursoId}/estudiantes`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            setEstudiantes(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAsistenciaChange = (e, estudianteId) => {
        setform({
            ...form,
            asistencias: {
                ...form.asistencias,
                [estudianteId]: e.target.value 
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form); // Log the form data to see if it's correctly populated
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro-asistencia`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.post(url, form, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({ curso: "", asistencias: {} });
        } catch (error) {
            console.log(error.response); // Log the entire error response for debugging
            setMensaje({ respuesta: error.response.data.error, tipo: false });
        }
    };

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="curso">Seleccionar Curso:</label>
                            <select id="curso" name='curso' onChange={handleCursoChange} className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required>
                                <option value="">Seleccione un curso</option>
                                {cursos.map(curso => (
                                    <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {cursoSeleccionado && (
                            <div>
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2">Nombre</th>
                                            <th className="py-2">Apellido</th>
                                            <th className="py-2">Asistencia</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {estudiantes.map(estudiante => (
                                            <tr key={estudiante._id}>
                                                <td className="border px-4 py-2">{estudiante.nombre}</td>
                                                <td className="border px-4 py-2">{estudiante.apellido}</td>
                                                <td className="border px-4 py-2 text-center">
                                                    <select name={`asistencia_${estudiante._id}`} onChange={(e) => handleAsistenciaChange(e, estudiante._id)} className="border-2 p-2 rounded-md">
                                                        <option value="ausente">Ausente</option>
                                                        <option value="presente">Presente</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-al mt-4">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};