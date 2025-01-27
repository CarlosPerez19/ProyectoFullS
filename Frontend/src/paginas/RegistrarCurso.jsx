import React from 'react'
import { Register } from '../componets/Register'
import { RegisterCursos } from '../componets/RegisterCursos'

const RegistrarCurso = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Curso</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar un curso</p>
            <RegisterCursos />
        </div>
    )
}

export default RegistrarCurso