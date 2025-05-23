import { useContext } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'

const ProfesoresDashboard = () => {
    const location = useLocation()
    const urlActual = location.pathname
    const navigate = useNavigate();

    const { auth } = useContext(AuthContext)
    const autenticado = localStorage.getItem('token')

    const handlePerfilClick = () => {
        navigate('/profesor-dashboard');
    };

    // Paleta solo tonos de verde
    const colores = {
        sidebar: '#3b8842',        // Verde medio para sidebar
        sidebarText: '#fff',       // Blanco para textos del sidebar
        sidebarActive: '#a6ce7d',  // Verde claro para el link activo
        sidebarActiveText: '#3b8842', // Verde medio para texto activo
        border: '#a6ce7d',         // Verde claro para bordes y detalles
        badge: '#a6ce7d',          // Verde claro para el badge de estado
        mainBg: '#f6fff8',         // Verde muy claro para fondo principal
        topbar: '#3b8842',         // Verde medio para la barra superior
        topbarText: '#fff',        // Blanco para texto barra superior
        salir: '#5a318e',          // Morado para el botón salir (contraste)
        footer: '#a6ce7d',         // Verde claro para el footer
        footerText: '#3b8842'      // Verde medio para el texto del footer
    };

    return (
        <div className='md:flex md:min-h-screen'>
            <div
                className='md:w-1/5 px-5 py-4'
                style={{ backgroundColor: colores.sidebar }}
            >
                <h2
                    className='text-4xl font-black text-center'
                    style={{ color: colores.sidebarText }}
                >
                    Profesor
                </h2>
                <img
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                    alt="img-client"
                    className="m-auto mt-8 p-1 border-2 rounded-full cursor-pointer"
                    width={120}
                    height={120}
                    style={{ borderColor: colores.border }}
                    onClick={handlePerfilClick}
                    title="Ir al perfil"
                />
                <p
                    className='text-center my-4 text-sm'
                    style={{ color: colores.sidebarText }}
                >
                    <span
                        className='w-3 h-3 inline-block rounded-full mr-1'
                        style={{ backgroundColor: colores.badge }}
                    ></span>
                    Bienvenido - {auth?.nombre}
                </p>
                <hr className="mt-5" style={{ borderColor: colores.border }} />

                <ul className="mt-5">
                    <li className="text-center">
                        <Link
                            to='/profesor-dashboard/registrar-nota'
                            className={`text-xl block mt-2 rounded-md text-center px-3 py-2 transition-colors`}
                            style={{
                                backgroundColor: urlActual === '/profesor-dashboard/registrar-nota' ? colores.sidebarActive : 'transparent',
                                color: urlActual === '/profesor-dashboard/registrar-nota' ? colores.sidebarActiveText : colores.sidebarText,
                                fontWeight: urlActual === '/profesor-dashboard/registrar-nota' ? 'bold' : 'normal'
                            }}
                        >
                            Registrar Notas
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            to='/profesor-dashboard/actualizar-nota'
                            className={`text-xl block mt-2 rounded-md text-center px-3 py-2 transition-colors`}
                            style={{
                                backgroundColor: urlActual === '/profesor-dashboard/actualizar-nota' ? colores.sidebarActive : 'transparent',
                                color: urlActual === '/profesor-dashboard/actualizar-nota' ? colores.sidebarActiveText : colores.sidebarText,
                                fontWeight: urlActual === '/profesor-dashboard/actualizar-nota' ? 'bold' : 'normal'
                            }}
                        >
                            Actualizar Notas
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            to='/profesor-dashboard/observacion-estudiante'
                            className={`text-xl block mt-2 rounded-md text-center px-3 py-2 transition-colors`}
                            style={{
                                backgroundColor: urlActual === '/profesor-dashboard/observacion-estudiante' ? colores.sidebarActive : 'transparent',
                                color: urlActual === '/profesor-dashboard/observacion-estudiante' ? colores.sidebarActiveText : colores.sidebarText,
                                fontWeight: urlActual === '/profesor-dashboard/observacion-estudiante' ? 'bold' : 'normal'
                            }}
                        >
                            Observaciones
                        </Link>
                    </li>
                    <li className="text-center">
                        <Link
                            to='/profesor-dashboard/estudiante-materia'
                            className={`text-xl block mt-2 rounded-md text-center px-3 py-2 transition-colors`}
                            style={{
                                backgroundColor: urlActual === '/profesor-dashboard/estudiante-materia' ? colores.sidebarActive : 'transparent',
                                color: urlActual === '/profesor-dashboard/estudiante-materia' ? colores.sidebarActiveText : colores.sidebarText,
                                fontWeight: urlActual === '/profesor-dashboard/estudiante-materia' ? 'bold' : 'normal'
                            }}
                        >
                            Buscar Estudiante
                        </Link>
                    </li>
                </ul>
            </div>

            <div
                className='flex-1 flex flex-col justify-between h-screen'
                style={{ backgroundColor: colores.mainBg }}
            >
                <div
                    className='py-2 flex md:justify-end items-center gap-5 justify-center'
                    style={{ backgroundColor: colores.topbar }}
                >
                    <div
                        className='text-md font-semibold'
                        style={{ color: colores.topbarText }}
                    >
                        Usuario - {auth?.nombre}
                    </div>
                    <div>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png"
                            alt="img-client"
                            className="border-2 rounded-full cursor-pointer"
                            width={50}
                            height={50}
                            style={{ borderColor: colores.badge }}
                            onClick={handlePerfilClick}
                            title="Ir al perfil"
                        />
                    </div>
                    <div>
                        <Link
                            to='/'
                            className="text-white mr-3 text-md block text-center px-4 py-1 rounded-lg transition-colors"
                            style={{ backgroundColor: colores.salir }}
                            onClick={() => { localStorage.removeItem('token') }}
                        >
                            Salir
                        </Link>
                    </div>
                </div>
                <div className='overflow-y-scroll p-8'>
                    {autenticado ? <Outlet /> : <Navigate to="/login" />}
                </div>
                <div
                    style={{ backgroundColor: colores.footer }}
                    className='h-12'
                >
                    <p
                        className='text-center leading-[2.9rem] underline'
                        style={{ color: colores.footerText }}
                    >
                        Todos los derechos reservados
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProfesoresDashboard