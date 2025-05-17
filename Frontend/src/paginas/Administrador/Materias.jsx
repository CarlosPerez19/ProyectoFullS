import React, { useState } from 'react'
import { RegisterMaterias } from '../../componets/RegisterMaterias'
import { ActualizarMaterias } from '../../componets/ActualizarMaterias';

const materiasEjemplo = [
    { id: 1, nombre: 'Matemáticas', codigo: 'MAT101' },
    { id: 2, nombre: 'Lengua', codigo: 'LEN102' },
];

const RegistrarMateria = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [materiaEditar, setMateriaEditar] = useState(null);
    const [materias, setMaterias] = useState(materiasEjemplo);

    const handleEditar = (materia) => {
        setMateriaEditar(materia);
        setMostrarEditar(true);
    };

    const handleEliminar = (id) => {
        setMaterias(materias.filter(mat => mat.id !== id));
    };

    const closeModal = () => {
        setMostrarRegistro(false);
        setMostrarEditar(false);
        setMateriaEditar(null);
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500 text-center'>Registrar Materias</h1>
            <hr className='my-4' />
            <p className='mb-8 text-center'>Este módulo te permite registrar una materia</p>
            
            <div className="flex justify-center mb-8">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={() => setMostrarRegistro(true)}
                >
                    Registrar Materia
                </button>
            </div>

            {/* Modal para Registrar */}
            {mostrarRegistro && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <RegisterMaterias />
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
                        <ActualizarMaterias profesor={materiaEditar} onClose={closeModal} />
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
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Nombre</th>
                            <th className="py-2 px-4 border-b">Código</th>
                            <th className="py-2 px-4 border-b">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.map(mat => (
                            <tr key={mat.id}>
                                <td className="py-2 px-4 border-b text-center">{mat.nombre}</td>
                                <td className="py-2 px-4 border-b text-center">{mat.codigo}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <button
                                        className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                                        onClick={() => handleEditar(mat)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                                        onClick={() => handleEliminar(mat.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {materias.length === 0 && (
                            <tr>
                                <td colSpan="3" className="text-center py-4">No hay materias registradas.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegistrarMateria