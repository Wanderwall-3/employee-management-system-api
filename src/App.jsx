import './App.css'
import ListEmployeeTable from './components/ListEmployeeTable';
import AddOrUpdateEmployee from './components/AddOrUpdateEmployee';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/employee_management_system" element={<ListEmployeeTable />} />
        <Route path="/add-employee" element={<AddOrUpdateEmployee />} />
        <Route path="/update-employee/:id" element={<AddOrUpdateEmployee />}/>
        {/* <Route path="/update-employee/:id" element={<AddEmployee />} /> */}
      </Routes>
    </BrowserRouter>  
      
    </>
  )
}

export default App
