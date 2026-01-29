import { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { listDepartments } from '../services/DepartmentService'

const Employee = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentId, setDepartmentId] = useState('');
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const navigator = useNavigate()

  const { id } = useParams()

  function handleSaveOrUpdateEmployee(e) {
    e.preventDefault()

    if (validateForm()) {
      const employee = { firstName, lastName, email, departmentId };
      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data)
            navigator('/employees')
          })
          .catch((error) => console.error(error))
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data)
            navigator('/employees')
          })
          .catch((error) => console.log(error))
      }
    }
  }

  function validateForm() {
    let valid = true
    const errorsCopy = { ...errors }

    if (firstName.trim()) {
      errorsCopy.firstName = ''
    } else {
      errorsCopy.firstName = 'Firstname is required'
      valid = false
    }

    if (lastName.trim()) {
      errorsCopy.lastName = ''
    } else {
      errorsCopy.lastName = 'Lastname is required'
      valid = false
    }

    if (email.trim()) {
      errorsCopy.email = ''
    } else {
      errorsCopy.email = 'Email is required'
      valid = false
    }

    setErrors(errorsCopy)
    return valid
  }

  function pageTitle() {
    if (id) return 'Edit Employee'
    return 'Add Employee'
  }

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
      })
    }
  }, [id])

  useEffect(() => {
    listDepartments()
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className='card w-50 mx-auto mt-5'>
      <h3 className='card-header text-center'>{pageTitle()}</h3>
      <div className='card-body'>
        <form>
          <div className='row'>
            <div className='col-md'>
              <div className='mb-3'>
                <label className='form-label'>First Name</label>
                <input
                  type='text'
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  name='firstName'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
              </div>
            </div>
            <div className='col-md'>
              <div className='mb-3'>
                <label className='form-label'>Last Name</label>
                <input
                  type='text'
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  name='lastName'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>Email</label>
            <input
              type='email'
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
          </div>
          <div className='mb-3'>
            <label className='form-label'>Select Department</label>
            <select
              className='form-select'
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value=''>Select Department</option>
              {departments.map((dept) => (
                <option
                  key={dept.id}
                  value={dept.id}
                >
                  {dept.departmentName}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='btn btn-primary w-100'
            onClick={handleSaveOrUpdateEmployee}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Employee
