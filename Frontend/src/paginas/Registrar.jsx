import React from 'react'
import { Formulario } from '../componets/Formulario'
import { Register } from '../componets/Register'

const Registrar = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Agregar nuevo Administrador</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo te permite registrar un nuevo administrador</p>
            <Register />
        </div>
    )
}

export default Registrar