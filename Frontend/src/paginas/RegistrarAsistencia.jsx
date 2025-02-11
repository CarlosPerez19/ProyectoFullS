import React from 'react'
import { RegisterAsistencias } from '../componets/RegisterAsistencias'

const RegistrarAsistencia = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Asistencia</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar asistencias</p>
            <RegisterAsistencias />
        </div>
    )
}

export default RegistrarAsistencia