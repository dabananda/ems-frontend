import Footer from './components/Footer'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import NavbarComponent from './components/NavbarComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import Employee from './components/Employee'
import ListDepartment from './components/ListDepartment'
import Department from './components/Department'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container-fuild">
          <NavbarComponent />
          <Routes>
            <Route
              path="/"
              element={<Homepage />}
            ></Route>
            <Route
              path="/employees"
              element={<ListEmployeeComponent />}
            ></Route>
            <Route
              path="/add-employee"
              element={<Employee />}
            ></Route>
            <Route
              path="/edit-employee/:id"
              element={<Employee />}
            ></Route>
            <Route
              path="/departments"
              element={<ListDepartment />}
            ></Route>
            <Route
              path="/add-department"
              element={<Department />}
            ></Route>
            <Route
              path="/edit-department/:id"
              element={<Department />}
            ></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  )
}
