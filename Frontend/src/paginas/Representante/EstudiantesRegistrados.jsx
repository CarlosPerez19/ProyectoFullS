import React from 'react'
import VisualizarRepresentados from '../../componets/VisualizarRepresentados'

const EstudiantesRegistrados = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Mostrar Representados</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite visualizar tus representados</p>
            <VisualizarRepresentados />
        </div>
    )
}

export default EstudiantesRegistrados