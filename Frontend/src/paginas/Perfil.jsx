import React from 'react';
import { CardPerfil } from '../componets/Perfil/CardPerfil';
import FormularioPerfil from '../componets/Perfil/FormularioPerfil';
import Password from '../componets/Perfil/Password';
import { CardPerfilPaciente } from '../componets/Perfil/CardPerfilPaciente';
import AuthContext from '../context/AuthProvider';
import { useContext } from 'react';
import { Disclosure } from '@headlessui/react';

const Perfil = () => {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Perfil</h1>
                <hr className='my-4' />
                <p className='mb-8'>Este módulo te permite visualizar el perfil del usuario</p>
            </div>

            {
                "propietario" in auth 
                    ? (<CardPerfilPaciente/>)
                    : (
                        <div className='flex flex-col gap-y-8'>
                            <div className='w-full'>
                                <CardPerfil/>
                            </div>
                            <div className='w-full'>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="w-full bg-gray-800 text-white px-4 py-2 text-left text-xl rounded-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                {open ? 'Ocultar' : 'Actualizar Datos'}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2">
                                                <FormularioPerfil/>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                            <div className='w-full'>
                                <Disclosure>
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="w-full bg-gray-800 text-white px-4 py-2 text-left text-xl rounded-md focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                                {open ? 'Ocultar' : 'Cambiar Contraseña'}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2">
                                                <Password/>
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                            </div>
                        </div>
                    )
            }
        </>
    );
}

export default Perfil;