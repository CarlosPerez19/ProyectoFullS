import React from 'react'
import { RegisterNotasEstudiantes } from '../../componets/RegisterNotasEstudiantes'

const RegisterNotas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Notas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar las notas de los estudiantes</p>
            <RegisterNotasEstudiantes />
        </div>
    )
}

export default RegisterNotas