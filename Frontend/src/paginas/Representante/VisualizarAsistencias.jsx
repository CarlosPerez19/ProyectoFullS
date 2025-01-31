import React from 'react'
import ViewAsistance from '../../componets/ViewAsistance'

const VisualizarAsistencias = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Visualizar Asistencias</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este modulo te permite visualizar las asistencias de tus representados</p>
            <ViewAsistance />
        </div>
    )
}

export default VisualizarAsistencias