import React from 'react'
import { Register } from '../componets/Register'
import { RegisterEstudiantes } from '../componets/RegisterEstudiantes'

const RegistrarEstudiante = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar un estudiante</p>
            <RegisterEstudiantes />
        </div>
    )
}

export default RegistrarEstudiante