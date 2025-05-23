import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/Administrador/Listar'
import Crear from './paginas/Crear'
import Actualizar from './paginas/Actualizar'
import Perfil from './paginas/Perfil'
import { Confirmar } from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import Registrar from './paginas/Administrador/Registrar'
import Profesores from './paginas/Administrador/Profesores'
import Representante from './paginas/Administrador/Representante'
import Materias from './paginas/Administrador/Materias'
import Estudiante from './paginas/Administrador/Estudiante'
import RegistrarAsistencia from './paginas/RegistrarAsistencia'
import JustificarInasistencia from './paginas/Administrador/JustificarInasistencia'
import RegistrarCurso from './paginas/Administrador/RegistrarCurso'
import ProfesoresDashboard from './layout/ProfesoresDashboard'
import RegisterNotas from './paginas/Profesor/RegisterNotas'
import ActualizarNotas from './paginas/Profesor/ActualizarNotas'
import ObservacionesEstudiantes from './paginas/Profesor/ObservacionesEstudiantes'
import BuscarEstudiante from './paginas/Profesor/BuscarEstudiante'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* El login ahora es la página principal */}
          <Route path='/' element={<Auth />}>
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot/:id' element={<Forgot />} />
            <Route path='confirmar/:token' element={<Confirmar />} />
            <Route path='recuperar-password/:token' element={<Restablecer />} />
          </Route>

          <Route path='dashboard/*' element={
            <PrivateRoute>
              <Routes>
                <Route element={<Dashboard />}>
                  <Route index element={<Perfil />} />
                  <Route path='listar' element={<Listar />} />
                  <Route path='crear' element={<Crear />} />
                  <Route path='registrar' element={<Registrar />} />
                  <Route path='registrar-profesor' element={<Profesores />} />
                  <Route path='registrar-representante' element={<Representante />} />
                  <Route path='registrar-materia' element={<Materias />} />
                  <Route path='registrar-estudiante' element={<Estudiante />} />
                  <Route path='registro-asistencia' element={<RegistrarAsistencia />} />
                  <Route path='justificar-inasistencia' element={<JustificarInasistencia />} />
                  <Route path='registrar-curso' element={<RegistrarCurso />} />
                  <Route path='actualizar/:id' element={<Actualizar />} />
                </Route>
              </Routes>
            </PrivateRoute>
          } />

          <Route path='profesor-dashboard/*' element={
            <PrivateRoute>
              <Routes>
                <Route element={<ProfesoresDashboard />}>
                  <Route index element={<Perfil />} />
                  <Route path='listar' element={<Listar />} />
                  <Route path='registrar-nota' element={<RegisterNotas />} />
                  <Route path='actualizar-nota' element={<ActualizarNotas />} />
                  <Route path='observacion-estudiante' element={<ObservacionesEstudiantes />} />
                  <Route path='estudiante-materia' element={<BuscarEstudiante />} />
                </Route>
              </Routes>
            </PrivateRoute>
          } />

          {/* Página no encontrada */}
          <Route path='/notfound' element={<NotFound />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
