import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const ViewCalifications = () => {
    const { auth } = useContext(AuthContext); 
    const [estudiantes, setEstudiantes] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [estudianteSeleccionado, setEstudianteSeleccionado] = useState('');
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        
        const fetchEstudiantes = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/estudiantes-registrados`;
                const token = localStorage.getItem('token'); 
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });
                setEstudiantes(respuesta.data || []); 
                
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
            const url = `${import.meta.env.VITE_BACKEND_URL}/ver-notas-estudiante/${idEstudiante}`;
            const token = localStorage.getItem('token'); 
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setCalificaciones(respuesta.data || []); 
            
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
                            <h2 className="text-2xl font-bold mt-8">Calificaciones</h2>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Materia</th>
                                        <th className="py-2">Nota</th>
                                        <th className="py-2">Motivo</th>
                                        <th className="py-2">Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {calificaciones.map((calificacion, index) => (
                                        calificacion.notasDetalle.notas.map(nota => (
                                            <tr key={nota._id}>
                                                <td className="border px-4 py-2">{calificacion.notasDetalle.materia}</td>
                                                <td className="border px-4 py-2">{nota.nota}</td>
                                                <td className="border px-4 py-2">{nota.motivo}</td>
                                                <td className="border px-4 py-2">{nota.fecha}</td>
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

export default ViewCalifications;