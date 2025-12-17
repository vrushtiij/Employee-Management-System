import Login from './login'
import Dashboard from './dashboard';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './register';
import { Route, Routes } from 'react-router-dom';
import AddEmployee from './add_employee';
import ViewAllEmployees from './ViewAllEmployees';
import ViewEmployee from './ViewEmployee';
import UpdateEmployee from './updateEmployee';
import ProtectedRoute from './ProtectedRoute';
import EmpDetails from './EmpDetails';
import AddEmpNav from './addEmp';
function App() {

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Signup' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add' element={<AddEmployee/>} />
        <Route path='/View_All' element={<ViewAllEmployees />} />
        <Route path='/view/:employee_id' element={<ProtectedRoute><ViewEmployee /></ProtectedRoute>} />
        <Route path='/update/:employee_id' element={<UpdateEmployee/>} />
        <Route path='/addEmp' element={<EmpDetails />} />
        <Route path='/empNav' element={<AddEmpNav />} />
      </Routes>
    </>
  )
}

export default App
