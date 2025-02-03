import { useContext } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'



const Dashboard = () => {
    
    const location = useLocation()
    const urlActual = location.pathname

    const { auth} = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')   

    return (
        <div className='md:flex md:min-h-screen '>

            <div className='md:w-1/5 bg-gray-800 px-5 py-4'>

                <h2 className='text-4xl font-black text-center text-slate-200'>ADMIN</h2>

                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto mt-8 p-1 border-2 border-slate-500 rounded-full" width={120} height={120} />
                <p className='text-slate-400 text-center my-4 text-sm'> <span className='bg-green-600 w-3 h-3 inline-block rounded-full'></span> Bienvenido - {auth?.nombre}</p>
                <hr className="mt-5 border-slate-500" />

                <ul className="mt-5">

                    <li className="text-center">
                        <Link to='/dashboard' className={`${urlActual === '/dashboard' ? 'text-slate-200 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Perfil</Link>
                    </li>


                    <li className="text-center">
                        <Link to='/dashboard/registrar' className={`${urlActual === '/dashboard/registrar' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Administrador</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/registrar-profesor' className={`${urlActual === '/dashboard/registrar-profesor' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Profesores</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/registrar-representante' className={`${urlActual === '/dashboard/registrar-representante' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Representantes</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/registrar-curso' className={`${urlActual === '/dashboard/registrar-curso' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Cursos</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/registrar-materia' className={`${urlActual === '/dashboard/registrar-materia' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Materias</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/registrar-estudiante' className={`${urlActual === '/dashboard/registrar-estudiante' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Estudiantes</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/asignar-representante' className={`${urlActual === '/dashboard/asignar-representante' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Asignacion  Representantes</Link>
                    </li>

                    
                    <li className="text-center">
                        <Link to='/dashboard/registro-asistencia' className={`${urlActual === '/dashboard/registro-asistencia' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Registrar Asistencias</Link>
                    </li>

                    <li className="text-center">
                        <Link to='/dashboard/justificar-inasistencia' className={`${urlActual === '/dashboard/justificar-inasistencia' ? 'text-slate-100 bg-gray-900 px-3 py-2 rounded-md text-center' : 'text-slate-600'} text-xl block mt-2 hover:text-slate-600`}>Inasistencias</Link>
                    </li>

                </ul>

            </div>

            <div className='flex-1 flex flex-col justify-between h-screen bg-gray-100'>
                <div className='bg-gray-800 py-2 flex md:justify-end items-center gap-5 justify-center'>
                    <div className='text-md font-semibold text-slate-100'>
                        Usuario - {auth?.nombre}
                    </div>
                    <div>
                        <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="border-2 border-green-600 rounded-full" width={50} height={50} />
                    </div>
                    <div>
                        <Link to='/' className=" text-white mr-3 text-md block hover:bg-red-900 text-center
                        bg-red-800 px-4 py-1 rounded-lg" onClick={()=>{localStorage.removeItem('token')}}>Salir</Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login"/>}
                </div>
                <div className='bg-gray-800 h-12'>
                    <p className='text-center  text-slate-100 leading-[2.9rem] underline'>Todos los derechos reservados</p>
                </div>

            </div>



        </div>
    )
}

export default Dashboard