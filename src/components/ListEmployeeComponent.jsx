import { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([])
  const navigator = useNavigate()

  function getListEmployees() {
    listEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getListEmployees()
  }, [])

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`)
  }

  function handleDeleteEmployee(id) {
    deleteEmployee(id)
      .then((response) => {
        console.log(response.data)
        getListEmployees()
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className='mx-auto w-75 py-5'>
      <div className='d-flex justify-content-between mb-3'>
        <h3 className='text-center'>List of Employees</h3>
        <button
          className='btn btn-primary'
          onClick={addNewEmployee}
        >
          Add Employee
        </button>
      </div>
      <table className='table border table-striped'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>First</th>
            <th scope='col'>Last</th>
            <th scope='col'>Email</th>
            <th scope='col'>Department</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <th scope='row'>{employee.id}</th>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.departmentName || 'N/A'}</td>
              <td>
                <button
                  className='btn btn-info'
                  onClick={() => updateEmployee(employee.id)}
                >
                  Update
                </button>
                <button
                  className='btn btn-danger ms-2'
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListEmployeeComponent
