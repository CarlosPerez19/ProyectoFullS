import React from 'react'
import { RegisterRepresentante } from '../componets/RegisterRepresentante'

const RegistrarRepresentante = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Registrar Representantes</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite registrar un representante</p>
            <RegisterRepresentante />
        </div>
    )
}

export default RegistrarRepresentante