import React, { useState } from 'react'
import { RegisterEstudiantes } from '../../componets/RegisterEstudiantes'
import { ActualizarEstudiantes } from '../../componets/ActualizarEstudiantes';

const estudiantesEjemplo = [
    { id: 1, nombre: 'Luis', apellido: 'Gómez', email: 'luis@mail.com' },
    { id: 2, nombre: 'Sofía', apellido: 'Vera', email: 'sofia@mail.com' },
];

const RegistrarEstudiante = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [estudianteEditar, setEstudianteEditar] = useState(null);
    const [estudiantes, setEstudiantes] = useState(estudiantesEjemplo);

    const handleEditar = (estudiante) => {
        setEstudianteEditar(estudiante);
        setMostrarEditar(true);
    };

    const handleEliminar = (id) => {
        setEstudiantes(estudiantes.filter(est => est.id !== id));
    };

    const closeModal = () => {
        setMostrarRegistro(false);
        setMostrarEditar(false);
        setEstudianteEditar(null);
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500 text-center'>Registrar Estudiante</h1>
            <hr className='my-4' />
            <p className='mb-8 text-center'>Este módulo te permite registrar un estudiante</p>
            
            <div className="flex justify-center mb-8">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={() => setMostrarRegistro(true)}
                >
                    Registrar Estudiante
                </button>
            </div>

            {/* Modal para Registrar */}
            {mostrarRegistro && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <RegisterEstudiantes />
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
                        <ActualizarEstudiantes profesor={estudianteEditar} onClose={closeModal} />
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
                        {estudiantes.map(est => (
                            <tr key={est.id}>
                                <td className="py-2 px-4 border-b text-center">{est.nombre}</td>
                                <td className="py-2 px-4 border-b text-center">{est.apellido}</td>
                                <td className="py-2 px-4 border-b text-center">{est.email}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleEditar(est)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                                            onClick={() => handleEliminar(est.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {estudiantes.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No hay estudiantes registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RegistrarEstudiante