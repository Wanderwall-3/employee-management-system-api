import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  postEmployee,
  updateEmployee,
} from "../services/EmployeeService";

const AddOrUpdateEmployee = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");

  const employee = {
    name,
    age,
    email,
    phoneNumber,
  };

  const { id } = useParams();
  console.log("ID:", id);

  useEffect(() => {
    if (id) {
      console.log("Fetching employee data for ID:", id);
      getEmployeeById(id).then((response) => {
        console.log(response.data);

        setName(response.data.name);
        setAge(response.data.age);
        setEmail(response.data.email);
        setPhone(response.data.phoneNumber);
      });
    }
  }, [id]);

  

  const handleSubmit = (e) => {
    e.preventDefault();

    setName(name.trim());
    setAge(age);
    setEmail(email.trim());
    setPhone(phoneNumber.trim());

    if (name === "" || age === "" || email === "" || phoneNumber === "") {
      alert("Please fill in all fields.");
      return;
    }

    if (id) {
      updateEmployee(id, employee).then((response) => {
        console.log("ok");
        console.log("Employee updated successfully:", response.data);
        setName("");
        setAge("");
        setEmail("");
        setPhone("");
        navigate("/");
      });
    } 
    else {
      postEmployee(employee)
        .then((response) => {
          console.log("Employee added successfully:", response.data);
          // Optionally, you can reset the form fields after successful submission
          setName("");
          setAge("");
          setEmail("");
          setPhone("");
          alert("Employee added successfully");
        })
        .catch((error) => {
          console.error("There was an error adding the employee!", error);
        });
    }
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <h1 className="text-center">{id ? "Update Employee" : "Add Employee"}</h1>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter first name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="number"
                className="form-control"
                id="age"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                {id ? "Update Employee" : "Add Employee"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddOrUpdateEmployee;
