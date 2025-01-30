import React from 'react'
import { SearchStudent } from '../../componets/SearchStudent'

const BuscarEstudiante = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Buscar Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite buscar los datos de un estudiante</p>
            <SearchStudent />
        </div>
    )
}

export default BuscarEstudiante