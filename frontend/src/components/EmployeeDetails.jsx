import { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ firstName: '', lastName: '', gender: '', salary: '' });
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees from backend on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/employees/getEmployees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  // Add new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/v1/employees/addEmployee', newEmployee)
      .then(response => {
        setEmployees([...employees, response.data]);
        setNewEmployee({ firstName: '', lastName: '', gender: '', salary: '' });
      })
      .catch(error => console.error('Error adding employee:', error));
  };

  // Update employee
  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      // Update request
      axios.put(`http://localhost:8080/api/v1/employees/updateEmployee/${editingEmployee}`, newEmployee)
        .then(response => {
          setEmployees(employees.map(employee =>
            employee.id === editingEmployee ? response.data : employee // Update the state with modified employee data
          ));
          setNewEmployee({ firstName: '', lastName: '', gender: '', salary: '' });
          setEditingEmployee(null); // Exit edit mode
        })
        .catch(error => console.error('Error updating employee:', error));
    }
  };

  // Edit employee details (fills the form for editing)
  const handleEditEmployee = (employee) => {
    setNewEmployee({ firstName: employee.firstName, lastName: employee.lastName, gender: employee.gender, salary: employee.salary });
    setEditingEmployee(employee.id); // Enter edit mode with this employee's ID
  };

  // Delete employee
  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:8080/api/v1/employees/delete/${id}`)
      .then(() => {
        setEmployees(employees.filter(employee => employee.id !== id));
      })
      .catch(error => console.error('Error deleting employee:', error));
  };

  return (
    <div className="mb-4">
      <h2>Employee Details</h2>

      {/* Handle Add or Edit based on editingEmployee state */}
      <form onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee} className="mb-3">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={newEmployee.firstName}
            onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={newEmployee.lastName}
            onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <input
            type="text"
            className="form-control"
            id="gender"
            value={newEmployee.gender}
            onChange={(e) => setNewEmployee({ ...newEmployee, gender: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary</label>
          <input
            type="text"
            className="form-control"
            id="salary"
            value={newEmployee.salary}
            onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingEmployee ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.gender}</td>
              <td>{employee.salary}</td>
              <td>
                <button onClick={() => handleEditEmployee(employee)} className="btn btn-warning btn-sm me-2">Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetails;
