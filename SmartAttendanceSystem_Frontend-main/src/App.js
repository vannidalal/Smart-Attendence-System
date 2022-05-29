import './App.css';
import Admin from './Admin/Admin';
import Camera from './Admin/Camera/Camera';
import Home from './Home/Home';
import { Routes, Route } from 'react-router-dom';
import SuperAdmin from './SuperAdmin/SuperAdmin';
import Employee from './Employee/Employee';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='admin' element={<Admin />}></Route>
        <Route path='superadmin' element={<SuperAdmin />}></Route>
        <Route path='employee' element={<Employee />}></Route>
        <Route path='capture-attendance' element={<Camera />}></Route>
      </Routes>
    </div>
  );
}

export default App;
