import React from 'react'
import { ObservacionEstudiante } from '../../componets/ObservacionEstudiante'

const ObservacionesEstudiantes = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Observaciones</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar observaciones de los estudiantes</p>
            <ObservacionEstudiante />
        </div>
    )
}

export default ObservacionesEstudiantes