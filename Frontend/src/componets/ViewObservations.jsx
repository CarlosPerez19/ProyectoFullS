import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const ViewObservations = () => {
    const { auth } = useContext(AuthContext); 
    const [estudiantes, setEstudiantes] = useState([]);
    const [observaciones, setObservaciones] = useState([]);
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
            const url = `${import.meta.env.VITE_BACKEND_URL}/ver-observaciones-estudiante/${idEstudiante}`;
            const token = localStorage.getItem('token'); 
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setObservaciones(respuesta.data.representante || []); 
            
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
                            <h2 className="text-2xl font-bold mt-8">Observaciones</h2>
                            <table className="min-w-full bg-white">
                                <thead>
                                    <tr>
                                        <th className="py-2">Fecha</th>
                                        <th className="py-2">Observación</th>
                                        <th className="py-2">Profesor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {observaciones.map((representante, index) => (
                                        representante.observacionesDetalle.observaciones.map(obs => (
                                            <tr key={index}>
                                                <td className="border px-4 py-2">{obs.fecha}</td>
                                                <td className="border px-4 py-2">{obs.observacion}</td>
                                                <td className="border px-4 py-2">{obs.profesor}</td>
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

export default ViewObservations;