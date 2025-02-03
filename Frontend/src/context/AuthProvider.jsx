import axios from "axios"
import { createContext, useEffect, useState } from "react"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({})

    const perfil = async() => {
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/perfil`;
            const token = localStorage.getItem('token'); 
            const respuesta = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAuth(respuesta.data)
            console.log(respuesta.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token)
        {
            perfil(token)
        }
    }, [])

    const actualizarPerfil = async(datos) => {
        const token = localStorage.getItem('token')
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/cambiar-datos`
            const options = {
                headers: {
                    method: 'PATCH',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            const respuesta = await axios.patch(url, datos, options)
            perfil(token)
            return {respuesta:respuesta.data.mensaje,tipo:true}
        } catch (error) {
            return {respuesta:error.response.data.error,tipo:false}
        }
}


const actualizarPassword = async (datos) => {
    const token = localStorage.getItem('token')
    try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/cambiar-password`
        const options = {
            headers: {
                method: 'PATCH',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const respuesta = await axios.patch(url, datos, options)
        console.log(respuesta)
        return { respuesta: respuesta.data.mensaje, tipo: true }
    } catch (error) {
        return { respuesta: error.response.data.error, tipo: false }
    }
}
    
    return (
        <AuthContext.Provider value={
            {
                auth,
                setAuth,
                actualizarPerfil,
                actualizarPassword            
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext