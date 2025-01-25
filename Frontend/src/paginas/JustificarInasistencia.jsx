import React from 'react'
import { Register } from '../componets/Register'

const JustificarInasistencia = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Justificar Inasistencia</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite justificar inasistencias</p>
            <Register />
        </div>
    )
}

export default JustificarInasistencia