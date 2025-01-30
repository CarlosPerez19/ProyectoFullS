import axios from 'axios'
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from '../context/AuthProvider'
import Mensaje from '../componets/Alertas/Mensajes'

const Login = () => {
    const [mensaje, setMensaje] = useState({})
    const navigate = useNavigate()
    const { setAuth, setEstado } = useContext(AuthContext)

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const url = `${import.meta.env.VITE_BACKEND_URL}/login`
            const respuesta = await axios.post(url, form)
            localStorage.setItem('token', respuesta.data.token)
            setAuth(respuesta.data)
            console.log(respuesta.data.rol)
            console.log(respuesta.data)

            if (respuesta.data.mensaje.includes('profesor')) {
                navigate('/profesor-dashboard');
            } else if (respuesta.data.mensaje.includes('representante')) { 
                navigate('/representante-dashboard');
            }
            else {
                navigate('/dashboard');
            }

        } catch (error) {
            toast.error(error.response.data.error)
            setform({})
            setTimeout(() => {
                setMensaje({})
            }, 5000);
        }
    }

    return (
        <>
            <ToastContainer/>
            <div className="w-1/2 h-screen bg-[url('/public/images/descubrir.jpg')] 
            bg-no-repeat bg-cover bg-center sm:block hidden
            ">
            </div>
            {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div className="w-1/2 h-screen bg-white flex justify-center items-center">

                <div className="md:w-4/5 sm:w-full">
                
                    <div className="flex justify-center mb-6">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR58EY_JijUgAGct2dUABbc0FRLLsEa9FaQDQ&s" alt="Logo" className="h-60 w-60 rounded-full object-cover" />
                    </div>
                    
                    <small className="text-gray-400 block my-4 text-sm">¡Bienvenido! Ingresa tus datos para iniciar</small>


                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Email</label>
                            <input type="email" placeholder="Enter you email"
                                name='email'
                                value={form.email || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="mb-3">
                            <label className="mb-2 block text-sm font-semibold">Password</label>
                            <input type="password" placeholder="********************"
                                name='password'
                                value={form.password || ""} onChange={handleChange}
                                className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-2 text-gray-500" />
                        </div>

                        <div className="my-4">
                            <button className="py-2 w-full block text-center bg-gray-500 text-slate-300 border rounded-xl hover:scale-100 duration-300 hover:bg-gray-900 hover:text-white">Login</button>
                        </div>  

                    </form>

                    <div className="mt-5 text-xs border-b-2 py-4 ">
                        <Link to="/forgot/id" className="underline text-sm text-gray-400 hover:text-gray-900">Forgot your password?</Link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login