import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes';
import AuthContext from '../context/AuthProvider';

export const RegisterNotasEstudiantes = () => {
    const { auth } = useContext(AuthContext); // Obtener el contexto de autenticación
    const [form, setform] = useState({
        cedula: '',
        nota: '',
        motivo: '',
        materia: '' // Cambiado a singular para seleccionar una sola materia
    });
    const [materias, setMaterias] = useState([]);
    const [mensaje, setMensaje] = useState({});

    useEffect(() => {
        // Fetch materias asociadas al profesor desde el backend
        const fetchMaterias = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/profesor/materias`;
                const token = localStorage.getItem('token'); // Obtén el token de localStorage
                const respuesta = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                    }
                });
                setMaterias(respuesta.data.cursosAsignados);
                console.log(respuesta.data.cursosAsignados);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMaterias();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setform({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form); // Log the form data to see if it's correctly populated
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/registro-nota`;
            const token = localStorage.getItem('token'); // Obtén el token de localStorage
            const respuesta = await axios.post(url, form, {
                headers: {
                    'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                }
            });
            setMensaje({ respuesta: respuesta.data.msg, tipo: true });
            setform({ cedula: '', nota: '', motivo: '', materia: '' });
        } catch (error) {
            console.log(error); // Log the entire error response for debugging
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
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="cedula">Cedula:</label>
                            <input
                                type="text"
                                id="cedula"
                                name="cedula"
                                value={form.cedula || ""}
                                onChange={handleChange}
                                placeholder="Ingresa la cedula del estudiante"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="materia">Seleccionar Materia:</label>
                            <select
                                id="materia"
                                name="materia"
                                value={form.materia}
                                onChange={handleChange}
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            >
                                <option value="">Seleccione una materia</option>
                                {materias.map(materia => (
                                    <option key={materia._id} value={materia._id}>{materia.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="motivo" className="text-gray-700 uppercase font-bold text-sm">Motivo: </label>
                            <textarea
                                id="motivo"
                                name="motivo"
                                value={form.motivo || ""}
                                onChange={handleChange}
                                placeholder="Ingrese el motivo de la nota"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nota">Nota:</label>
                            <input
                                type="number"
                                id="nota"
                                name="nota"
                                value={form.nota || ""}
                                onChange={handleChange}
                                placeholder="Ingresa la nota"
                                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5"
                                required
                            />
                        </div>

                        <div>
                            <button className="bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-al mt-4">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterNotasEstudiantes;