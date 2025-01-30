import React from 'react'
import { ActualizarNotasEstudiantes } from '../../componets/ActualizarNotasEstudiantes'

const ActualizarNotas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Actualizar Notas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite actualizar las notas de los estudiantes</p>
            <ActualizarNotasEstudiantes />
        </div>
    )
}

export default ActualizarNotas