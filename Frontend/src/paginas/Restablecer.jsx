import { Link } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensajes'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Restablecer = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mensaje, setMensaje] = useState({});
    const [passwordCambiada, setPasswordCambiada] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setMensaje({ respuesta: "La contraseña debe tener al menos 6 caracteres.", tipo: false });
            return;
        }
        if (password !== password2) {
            setMensaje({ respuesta: "Las contraseñas no coinciden.", tipo: false });
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`;
            const body = {
                password,
                confirmPassword: password2
            };
            await axios.patch(url, body);
            setMensaje({ respuesta: "Contraseña cambiada correctamente.", tipo: true });
            setPassword('');
            setPassword2('');
            setPasswordCambiada(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMensaje({ respuesta: error.response?.data?.msg || "Error al cambiar la contraseña.", tipo: false });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-2 text-center uppercase text-gray-500">Restablecer Contraseña</h1>
            <small className="text-gray-400 block my-4 text-sm">Por favor ingresa tu nueva contraseña</small>
            {Object.keys(mensaje).length > 0 && (
                <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
            )}
            {!passwordCambiada && (
                <form className="w-full max-w-md mt-8 space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border rounded w-full p-2"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password2">
                            Repetir Contraseña
                        </label>
                        <input
                            type="password"
                            id="password2"
                            className="border rounded w-full p-2"
                            value={password2}
                            onChange={e => setPassword2(e.target.value)}
                            minLength={6}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 w-full"
                    >
                        Cambiar Contraseña
                    </button>
                </form>
            )}
            {passwordCambiada && (
                <>
                    <p className="md:text-lg lg:text-xl text-green-600 mt-8">Ya puedes iniciar sesión</p>
                    <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
                </>
            )}
        </div>
    );
};

export default Restablecer;