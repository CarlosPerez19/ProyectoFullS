import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const VisualizarRepresentados = () => {
    const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
    const [estudiantes, setEstudiantes] = useState([]);
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
            } catch (error) {
                console.error(error);
            }
        };
        fetchEstudiantes();
    }, [auth.id]);

    return (
        <>
            <div>
                <div>
                    {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}

                    <h2 className="text-2xl font-bold mt-8">Estudiantes Asociados</h2>
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2">Nombre Representante</th>
                                <th className="py-2">Apellido Representante</th>
                                <th className="py-2">Nombre Estudiante</th>
                                <th className="py-2">Apellido Estudiante</th>
                                <th className="py-2">Cédula Estudiante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.map(representante => (
                                representante.estudiantes.map(estudiante => (
                                    <tr key={estudiante.cedula}>
                                        <td className="border px-4 py-2">{representante.nombre}</td>
                                        <td className="border px-4 py-2">{representante.apellido}</td>
                                        <td className="border px-4 py-2">{estudiante.nombre}</td>
                                        <td className="border px-4 py-2">{estudiante.apellido}</td>
                                        <td className="border px-4 py-2">{estudiante.cedula}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default VisualizarRepresentados;