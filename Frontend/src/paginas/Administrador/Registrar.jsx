import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Register } from '../../componets/Register'
import { ActualizarAdministrador } from '../../componets/ActualizarAdministrador'

const Registrar = () => {
    const [mostrarRegistro, setMostrarRegistro] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [adminEditar, setAdminEditar] = useState(null);
    const [administradores, setAdministradores] = useState([]);
    const [mostrarConfirmar, setMostrarConfirmar] = useState(false); 
    const [adminEliminar, setAdminEliminar] = useState(null);

    
    useEffect(() => {
        const obtenerAdministradores = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/administradores`;
                const token = localStorage.getItem('token');
                const { data } = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setAdministradores(data);
            } catch (error) {
                setAdministradores([]);
            }
        };
        obtenerAdministradores();
    }, []);

    
    const handleEditar = (admin) => {
        setAdminEditar({ ...admin, id: admin._id || admin.id }); 
        setMostrarEditar(true);
    };

    
    const handleEliminar = (admin) => {
        setAdminEliminar(admin);
        setMostrarConfirmar(true);
    };

    
     const confirmarEliminar = async () => {
        if (!adminEliminar || (!adminEliminar._id && !adminEliminar.id)) {
            setMostrarConfirmar(false);
            setAdminEliminar(null);
            return;
        }
        try {
            
            const adminId = adminEliminar._id ? adminEliminar._id : adminEliminar.id;
            const url = `${import.meta.env.VITE_BACKEND_URL}/eliminar-administrador/${adminId}`;
            const token = localStorage.getItem('token');
            await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setAdministradores(prev =>
                prev.filter(admin =>
                    String(admin._id || admin.id) !== String(adminId)
                )
            );
        } catch (error) {
            
            console.log(error);
        }
        setMostrarConfirmar(false);
        setAdminEliminar(null);
    };

    const closeModal = () => {
        setMostrarRegistro(false);
        setMostrarEditar(false);
        setAdminEditar(null);
    };

    const closeConfirmar = () => {
        setMostrarConfirmar(false);
        setAdminEliminar(null);
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

            
            {mostrarEditar && adminEditar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        
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

            
            {mostrarConfirmar && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center">
                        <h2 className="text-xl font-bold mb-4">¿Estás seguro de eliminar este administrador?</h2>
                        <p className="mb-4">{adminEliminar?.nombre} {adminEliminar?.apellido}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                                onClick={confirmarEliminar}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600"
                                onClick={closeConfirmar}
                            >
                                Cancelar
                            </button>
                        </div>
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
                            <tr key={admin._id || admin.id}>
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
                                            onClick={() => handleEliminar(admin)}
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