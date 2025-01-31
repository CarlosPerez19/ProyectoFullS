import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const ViewAsistance = () => {
    const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
    const [estudiantes, setEstudiantes] = useState([]);
    const [asistencias, setAsistencias] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        // Fetch estudiantes asociados al representante desde el backend
        const fetchEstudiantes = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes-registrados`;
                const token = localStorage.getItem('token'); // Obtén el token de localStorage
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                    }
                });
                setEstudiantes(respuesta.data || []); // Asegurarse de que sea un array
                console.log(respuesta.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchEstudiantes();
    }, [auth.id]);

    const handleEstudianteChange = async (e) => {
        const idEstudiante = e.target.value;
        setEstudianteSeleccionado(idEstudiante);
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/ver-asistencia-estudiante/${idEstudiante}`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            setAsistencias(respuesta.data || []); // Asegurarse de que sea un array
            console.log(respuesta.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <h2 className="text-2xl font-bold mt-8">Estudiantes Asociados</h2>
                    <select
                        id="estudiante"
                        name="estudiante"
                        value={estudianteSeleccionado}
                        onChange={handleEstudianteChange}
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                        required
                    >
                        <option value="">Seleccione un estudiante</option>
                        {estudiantes.map(representante => (
                            representante.estudiantes.map(estudiante => (
                                <option key={estudiante._id} value={estudiante._id}>
                                    {estudiante.nombre} {estudiante.apellido}
                                </option>
                            ))
                        ))}
                    </select>

                    {estudianteSeleccionado && (
                        <div>
                            <h2 className="text-2xl font-bold mt-8">Asistencias</h2>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Fecha</th>
                                        <th className="py-2">Presente</th>
                                        <th className="py-2">Justificación</th>
                                        <th className="py-2">Atraso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asistencias.map((asistencia, index) => (
                                        asistencia.asistenciasDetalle.asistencia.map(asist => (
                                            <tr key={asist._id}>
                                                <td className="border px-4 py-2">{asist.fecha}</td>
                                                <td className="border px-4 py-2">{asist.presente ? 'Sí' : 'No'}</td>
                                                <td className="border px-4 py-2">{asist.justificacion}</td>
                                                <td className="border px-4 py-2">{asist.atraso ? 'Sí' : 'No'}</td>
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

export default ViewAsistance;