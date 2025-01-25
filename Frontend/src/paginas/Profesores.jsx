import React from 'react'
import { RegisterProfesores } from '../componets/RegisterProfesores'

const RegistrarProfesor = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Profesores</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar un profesor</p>
            <RegisterProfesores />
        </div>
    )
}

export default RegistrarProfesor