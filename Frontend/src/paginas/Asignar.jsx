import React from 'react'
import { Register } from '../componets/Register'
import { AsingRepresentante } from '../componets/AsignarRepresentante'

const AsignarRepresentante = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Asignar Representantes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite asignar un representante</p>
            <AsingRepresentante />
        </div>
    )
}

export default AsignarRepresentante