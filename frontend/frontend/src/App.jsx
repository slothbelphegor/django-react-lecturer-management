import { Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoutes'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PasswordResetRequest from './pages/auth/PasswordResetRequest'
import PasswordReset from './pages/auth/PasswordReset'

import CreateLecturer from './pages/lecturers/Create'
import EditLecturer from './pages/lecturers/Edit'
import DeleteLecturer from './pages/lecturers/Delete'
import ListLecturer from './pages/lecturers/List'

import ListSubject from './pages/subjects/List'
import CreateSubject from './pages/subjects/Create'
import EditSubject from './pages/subjects/Edit'
import DeleteSubject from './pages/subjects/Delete'
import ListDocument from './pages/documents/List'
import CreateDocument from './pages/documents/Create'
import DeleteDocument from './pages/documents/Delete'
import EditDocument from './pages/documents/Edit'


function App() {
  const location = useLocation()
  const noNavbar = location.pathname === '/register' || location.pathname === "/login" || location.pathname.includes("password") 
  return (
    <>
      {
        noNavbar ?
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/request/password_reset" element={<PasswordResetRequest />} />
            <Route path="/password_reset/:token" element={<PasswordReset />} />
          </Routes>
          :
          <Navbar
            content={
              <Routes>
                <Route element={<ProtectedRoute/>}>
                  <Route path="/" element={<Home />} />
                  <Route path="/lecturers" element={<ListLecturer />} />
                  <Route path="/lecturers/create" element={<CreateLecturer />}/>
                  <Route path="/lecturers/edit/:id" element={<EditLecturer />}/>
                  <Route path="/lecturers/delete/:id" element={<DeleteLecturer />}/>
                  <Route path="/subjects" element={<ListSubject/>}></Route>
                  <Route path="/subjects/create" element={<CreateSubject/>}></Route>
                  <Route path="/subjects/edit/:id" element={<EditSubject />}/>
                  <Route path="/subjects/delete/:id" element={<DeleteSubject />}/>
                  <Route path="/documents" element={<ListDocument/>}></Route>
                  <Route path="/documents/create" element={<CreateDocument/>}></Route>
                  <Route path="/documents/delete/:id" element={<DeleteDocument />}/>
                  <Route path="/documents/edit/:id" element={<EditDocument />}/>
                </Route>
              </Routes>
            }
          />
      }
    </>
  )
}

export default App
