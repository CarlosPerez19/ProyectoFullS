import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Listar from './paginas/Administrador/Listar'
import Visualizar from './paginas/Visualizar'
import Crear from './paginas/Crear'
import Actualizar from './paginas/Actualizar'
import Perfil from './paginas/Perfil'
import { Confirmar } from './paginas/Confirmar'
import Restablecer from './paginas/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { TratamientosProvider } from './context/TratamientosProvider'
import PrivateRouteWithRole from './routes/PrivateRouteWithRole'
import Registrar from './paginas/Registrar'
import Profesores from './paginas/Profesores'
import Representante from './paginas/Representante'
import Materias from './paginas/Materias'
import Estudiante from './paginas/Estudiante'
import Asignar from './paginas/Asignar'
import RegistrarAsistencia from './paginas/RegistrarAsistencia'
import JustificarInasistencia from './paginas/JustificarInasistencia'
import RegistrarCurso from './paginas/Administrador/RegistrarCurso'
import ProfesoresDashboard from './layout/ProfesoresDashboard'


function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <TratamientosProvider>
        <Routes>
          
          <Route index element={<LandinPage/>}/>

          <Route path='/' element={<Auth/>}>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='forgot/:id' element={<Forgot/>}/>
            <Route path='confirmar/:token' element={<Confirmar/>}/>
            <Route path='confirmar/:token' element={<Confirmar/>}/>
            <Route path='recuperar-password/:token' element={<Restablecer />} />
          </Route>

          <Route path='dashboard/*' element={
        <PrivateRoute>
          <Routes>
            <Route element={<Dashboard />}>
              <Route index element={<Perfil />} />
              <Route path='listar' element={<Listar />} />
              <Route path='visualizar/:id' element={<Visualizar />} />
              <Route path='crear' element={
                <PrivateRouteWithRole>
                  <Crear />
              </PrivateRouteWithRole>}/>

              <Route path='registrar' element={
                <PrivateRouteWithRole>
                  <Registrar />
              </PrivateRouteWithRole>}/>

              <Route path='registrar-profesor' element={
                <PrivateRouteWithRole>
                  <Profesores />
              </PrivateRouteWithRole>}/>

              <Route path='registrar-representante' element={
                <PrivateRouteWithRole>
                  <Representante />
              </PrivateRouteWithRole>}/>

              <Route path='registrar-materia' element={
                <PrivateRouteWithRole>
                  <Materias />
              </PrivateRouteWithRole>}/>

              <Route path='registrar-estudiante' element={
                <PrivateRouteWithRole>
                  <Estudiante />
              </PrivateRouteWithRole>}/>

              <Route path='asignar-representante' element={
                <PrivateRouteWithRole>
                  <Asignar />
              </PrivateRouteWithRole>}/>

              <Route path='registro-asistencia' element={
                <PrivateRouteWithRole>
                  <RegistrarAsistencia />
              </PrivateRouteWithRole>}/>

              <Route path='justificar-inasistencia' element={
                <PrivateRouteWithRole>
                  <JustificarInasistencia />
              </PrivateRouteWithRole>}/>

              <Route path='registrar-curso' element={
                <PrivateRouteWithRole>
                  <RegistrarCurso />
              </PrivateRouteWithRole>}/>

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
              <Route path='visualizar/:id' element={<Visualizar />} />
                
              </Route>
            </Routes>
          </PrivateRoute>
        } />

        </Routes>
      </TratamientosProvider>

      </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App
