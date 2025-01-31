import React from 'react'
import ViewObservations from '../../componets/ViewObservations'

const VisualizarObservaciones = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Visualizar Observaciones</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite visualizar las observaciones de tus representados</p>
            <ViewObservations />
        </div>
    )
}

export default VisualizarObservaciones