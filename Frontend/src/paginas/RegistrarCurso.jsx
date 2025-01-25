import React from 'react'
import { Register } from '../componets/Register'

const RegistrarCurso = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Curso</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar un curso</p>
            <Register />
        </div>
    )
}

export default RegistrarCurso