import React, { useState } from 'react'
import { RegisterRepresentante } from '../../componets/RegisterRepresentante'
import { ActualizarRepresentantes } from '../../componets/ActualizarRepresentantes';

const representantesEjemplo = [
    { id: 1, nombre: 'Mario', apellido: 'Suárez', email: 'mario@mail.com' },
    { id: 2, nombre: 'Paula', apellido: 'López', email: 'paula@mail.com' },
];

const RegistrarRepresentante = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [representanteEditar, setRepresentanteEditar] = useState(null);
    const [representantes, setRepresentantes] = useState(representantesEjemplo);

    const handleEditar = (representante) => {
        setRepresentanteEditar(representante);
        setMostrarEditar(true);
    };

    const handleEliminar = (id) => {
        setRepresentantes(representantes.filter(rep => rep.id !== id));
    };

    const closeModal = () => {
        setMostrarRegistro(false);
        setMostrarEditar(false);
        setRepresentanteEditar(null);
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500 text-center'>Registrar Representantes</h1>
            <hr className='my-4' />
            <p className='mb-8 text-center'>Este módulo te permite registrar un representante</p>
            
            <div className="flex justify-center mb-8">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={() => setMostrarRegistro(true)}
                >
                    Registrar Representante
                </button>
            </div>

            {/* Modal para Registrar */}
            {mostrarRegistro && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <RegisterRepresentante />
                        <button
                            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para Editar */}
             {mostrarEditar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        {/* Componente para actualizar profesor */}
                        <ActualizarRepresentantes representante={representanteEditar} onClose={closeModal} />
                        <button
                            className="mt-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 w-full"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 text-center">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-center">Nombre</th>
                            <th className="py-2 px-4 border-b text-center">Apellido</th>
                            <th className="py-2 px-4 border-b text-center">Email</th>
                            <th className="py-2 px-4 border-b text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {representantes.map(rep => (
                            <tr key={rep.id}>
                                <td className="py-2 px-4 border-b text-center">{rep.nombre}</td>
                                <td className="py-2 px-4 border-b text-center">{rep.apellido}</td>
                                <td className="py-2 px-4 border-b text-center">{rep.email}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleEditar(rep)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                                            onClick={() => handleEliminar(rep.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {representantes.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No hay representantes registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegistrarRepresentante