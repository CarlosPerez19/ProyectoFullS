import React, { useState } from 'react'
import { Register } from '../../componets/Register'
import { ActualizarAdministrador } from '../../componets/ActualizarAdministrador' // Importa tu componente de actualización

const administradoresEjemplo = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juanperez@mail.com' },
    { id: 2, nombre: 'Ana', apellido: 'García', email: 'anagarcia@mail.com' },
];

const Registrar = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [adminEditar, setAdminEditar] = useState(null);
    const [administradores, setAdministradores] = useState(administradoresEjemplo);

    const handleEditar = (admin) => {
        setAdminEditar(admin);
        setMostrarEditar(true);
    };

    const handleEliminar = (id) => {
        setAdministradores(administradores.filter(admin => admin.id !== id));
    };

    const closeModal = () => {
        setMostrarRegistro(false);
        setMostrarEditar(false);
        setAdminEditar(null);
    };

    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500 text-center'>Agregar nuevo Administrador</h1>
            <hr className='my-4' />
            <p className='mb-8 text-center'>Este módulo te permite registrar un nuevo administrador</p>
            
            <div className="flex justify-center mb-8">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                    onClick={() => setMostrarRegistro(true)}
                >
                    Registrar Administrador
                </button>
            </div>

            {/* Modal para Registrar */}
            {mostrarRegistro && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <Register />
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
                        {/* Aquí se muestra el componente para actualizar el administrador */}
                        <ActualizarAdministrador admin={adminEditar} onClose={closeModal} />
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
                        {administradores.map(admin => (
                            <tr key={admin.id}>
                                <td className="py-2 px-4 border-b text-center">{admin.nombre}</td>
                                <td className="py-2 px-4 border-b text-center">{admin.apellido}</td>
                                <td className="py-2 px-4 border-b text-center">{admin.email}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                            onClick={() => handleEditar(admin)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
                                            onClick={() => handleEliminar(admin.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {administradores.length === 0 && (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No hay administradores registrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Registrar