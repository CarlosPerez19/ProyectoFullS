import { Link } from 'react-router-dom'
import Mensaje from '../componets/Alertas/Mensajes'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export const Confirmar = () => {
    const { token } = useParams();
    const [mensaje, setMensaje] = useState({})
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [mensajePassword, setMensajePassword] = useState({});
    const [passwordCambiada, setPasswordCambiada] = useState(false);

    const verifyToken = async () => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar-cuenta/${token}`
            const respuesta = await axios.get(url)
            setMensaje({ respuesta: respuesta.data.mensaje, tipo: true })
        } catch (error) {
            setMensaje({ respuesta: error.response.data.error, tipo: false })
        }
    }

    useEffect(() => {
        verifyToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setMensajePassword({ respuesta: "La contraseña debe tener al menos 6 caracteres.", tipo: false });
            return;
        }
        if (password !== password2) {
            setMensajePassword({ respuesta: "Las contraseñas no coinciden.", tipo: false });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/nuevo-password/${token}`;
            const body = {
                password,
                confirmPassword: password2
            };
            await axios.patch(url, body);
            setMensajePassword({ respuesta: "Contraseña cambiada correctamente.", tipo: true });
            setPassword('');
            setPassword2('');
            setPasswordCambiada(true);
        } catch (error) {
            setMensajePassword({ respuesta: error.response?.data?.error || "Error al cambiar la contraseña.", tipo: false });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mt-4">Por favor cambia tu contraseña antes de iniciar</p>
                {!passwordCambiada && (
                    <form onSubmit={handleSubmit} className="w-full max-w-md mt-8 space-y-4">
                        {Object.keys(mensajePassword).length > 0 && (
                            <Mensaje tipo={mensajePassword.tipo}>{mensajePassword.respuesta}</Mensaje>
                        )}
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
        </div>
    )
}