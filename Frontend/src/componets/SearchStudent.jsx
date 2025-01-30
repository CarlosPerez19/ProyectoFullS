import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const SearchStudent = () => {
    const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
    const [form, setform] = useState({});
    const [cursos, setCursos] = useState([]); 
    const [materias, setMaterias] = useState([]);
    const [cursoSeleccionado, setCursoSeleccionado] = useState('');
    const [estudiantes, setEstudiantes] = useState([]);
    const [motivos, setMotivos] = useState([]);
    const [motivoSeleccionado, setMotivoSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/profesor/cursos`;
                const token = localStorage.getItem('token'); 
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setCursos(respuesta.data.cursosAsociados || []); 
            } catch (error) {
                console.error(error);
            }
        };
        fetchCursos();
    }, [auth.id]);

    const handleCursoChange = async (e) => {
        const cursoId = e.target.value;
        setCursoSeleccionado(cursoId);
        setform({ ...form, materia: '' }); // Reset materia when a new course is selected
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/profesor/${cursoId}/materias`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            console.log(respuesta.data);
            const materiasDetalle = respuesta.data.materiasAsignadas.flatMap(asignacion => asignacion.materiasDetalle) || [];
            setMaterias(materiasDetalle); // Asegurarse de que sea un array
        } catch (error) {
            console.error(error);
        }
    };

    const handleMateriaChange = async (e) => {
        const materiaId = e.target.value;
        setform({ ...form, materia: materiaId });
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/profesor/${materiaId}/estudiantes`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            console.log(respuesta.data);
            setEstudiantes(respuesta.data.estudiantesPorMateria || []); // Asegurarse de que sea un array

            // Obtener los motivos únicos de las notas
            const motivosUnicos = new Set();
            respuesta.data.estudiantesPorMateria.forEach(estudiante => {
                estudiante.notasDetalle.forEach(nota => {
                    motivosUnicos.add(nota.notas.motivo);
                });
            });
            setMotivos([...motivosUnicos]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMotivoChange = (e) => {
        setMotivoSeleccionado(e.target.value);
    };

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <form>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="curso">Seleccionar Curso:</label>
                            <select
                                id="curso"
                                name="curso"
                                value={cursoSeleccionado}
                                onChange={handleCursoChange}
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            >
                                <option value="">Seleccione un curso</option>
                                {Array.isArray(cursos) && cursos.map(curso => (
                                    <option key={curso._id} value={curso._id}>{curso.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {cursoSeleccionado && (
                            <div>
                                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="materia">Seleccionar Materia:</label>
                                <select
                                    id="materia"
                                    name="materia"
                                    value={form.materia}
                                    onChange={handleMateriaChange}
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                    required
                                >
                                    <option value="">Seleccione una materia</option>
                                    {Array.isArray(materias) && materias.map(materia => (
                                        <option key={materia._id} value={materia._id}>{materia.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {form.materia && (
                            <div>
                                <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="motivo">Seleccionar Motivo:</label>
                                <select
                                    id="motivo"
                                    name="motivo"
                                    value={motivoSeleccionado}
                                    onChange={handleMotivoChange}
                                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                    required
                                >
                                    <option value="">Seleccione un motivo</option>
                                    {motivos.map((motivo, index) => (
                                        <option key={index} value={motivo}>{motivo}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </form>

                    {form.materia && motivoSeleccionado && (
                        <div>
                            <h2 className="text-2xl font-bold mt-8">Estudiantes Asignados</h2>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Nombre</th>
                                        <th className="py-2">Apellido</th>
                                        <th className="py-2">Materia</th>
                                        <th className="py-2">Nota</th>
                                        <th className="py-2">Motivo</th>
                                        <th className="py-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {estudiantes.map(estudiante => (
                                        estudiante.notasDetalle
                                            .filter(nota => nota.notas.motivo === motivoSeleccionado)
                                            .map((nota, index) => (
                                                <tr key={`${estudiante.estudiantesDetalle.nombre}-${index}`}>
                                                    <td className="border px-4 py-2">{estudiante.estudiantesDetalle.nombre}</td>
                                                    <td className="border px-4 py-2">{estudiante.estudiantesDetalle.apellido}</td>
                                                    <td className="border px-4 py-2">{estudiante.materiasDetalle.nombre}</td>
                                                    <td className="border px-4 py-2">{nota.notas.nota}</td>
                                                    <td className="border px-4 py-2">{nota.notas.motivo}</td>
                                                    <td className="border px-4 py-2">{nota.notas.fecha}</td>
                                                </tr>
                                            ))
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default SearchStudent;