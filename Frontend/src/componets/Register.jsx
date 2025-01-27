import { useState } from 'react'
import axios from 'axios';
import Mensaje from '../componets/Alertas/Mensajes'

export const Register = () => {


    // paso 1 
    const [form, setform] = useState({
        nombre: "",
        apellido: "",
        email: ""
    })
    
    // paso 2
    const handleChange = (e) => {
        setform({...form,
            [e.target.name]:e.target.value
        })
    }

    // paso 3

    const [mensaje, setMensaje] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form); // Log the form data to see if it's correctly populated
        try {
          const url =  `${import.meta.env.VITE_BACKEND_URL}/registro`;
          const respuesta = await axios.post(url, form);
          setMensaje({ respuesta: respuesta.data.msg, tipo: true });
          setform({});
        } catch (error) {
          console.log(error.response); // Log the entire error response for debugging
          setMensaje({ respuesta: error.response.data.msg, tipo: false });
        }
      };


      return (
        <>
            <div>

                <div>
                    {Object.keys(mensaje).length>0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
              
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="nombre">Nombre:</label>
                            <input type="text" id="nombre" name='nombre'
                                value={form.nombre || ""} onChange={handleChange}
                                placeholder="Ingresa tu nombre" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div >
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="apellido">Apellido:</label>
                            <input type="text" id="apellido" name='apellido'
                                value={form.apellido || ""} onChange={handleChange}
                                placeholder="Ingresa tu apellido" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div >
                            <label className="text-gray-700 uppercase font-bold text-sm" htmlFor="email">Email:</label>
                            <input type="email" id="email" name='email'
                                value={form.email || ""} onChange={handleChange}
                                placeholder="Ingresa tu email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5" required />
                        </div>

                        <div>
                            <button className=" bg-gray-600 w-full p-3 text-slate-300 uppercase font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-al mt-4">Registrar</button>
                        </div>

                    </form>

                </div>

            </div>

        </>
    )
}
