import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";

const ListEmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const AddEmployeeHandler = () => {
    navigate("/add-employee");
  };

  const deleteEmployeeHandler = (id) =>{
    deleteEmployee(id).then(() => {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }).catch((error) => {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee. Please try again.");
    })
  }

  const updateEmployeeHandler = (id) => {
    navigate(`/update-employee/${id}`);
  }

  return (
    <div className="container ">
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-primary text-center">List All Employee</h1>

          <button className="btn btn-success btn-sm" onClick={AddEmployeeHandler}>
            Add Employee
          </button>

          <table className="table table-bordered table-striped mt-3">
            <thead className="table-dark text-center">
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Age</th>
                <th>Email Id</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-dark bg-light">
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.age}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phoneNumber}</td>
                  <td className="text-center">
                    <button className="btn btn-primary btn-sm" onClick={() => updateEmployeeHandler(employee.id)} >Update</button>{" "}
                    <button className="btn btn-danger btn-sm" onClick={() => deleteEmployeeHandler(employee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmployeeTable;
