import React from 'react'
import VisualizarRepresentados from '../../componets/VisualizarRepresentados'
import ViewCalifications from '../../componets/ViewCalifications'

const VisualizarNotas = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Visualizar Notas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite visualizar las calificaciones de tus representados</p>
            <ViewCalifications />
        </div>
    )
}

export default VisualizarNotas