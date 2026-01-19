import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createDepartment, getDepartment, updateDepartment } from '../services/DepartmentService'

const Department = () => {
  const [departmentName, setDepartmentName] = useState('')
  const [departmentDescription, setDepartmentDescription] = useState('')
  const [errors, setErrors] = useState({
    departmentName: '',
    departmentDescription: '',
  })

  const { id } = useParams()
  const navigator = useNavigate()

  function pageTitle() {
    if (id) return 'Edit Department'
    return 'Add Department'
  }

  function validateForm() {
    let valid = true
    const errorCopy = { ...errors }

    if (departmentName.trim()) {
      errorCopy.departmentName = ''
    } else {
      errorCopy.departmentName = 'Department name is required'
      valid = false
    }

    if (departmentDescription.trim()) {
      errorCopy.departmentDescription = ''
    } else {
      errorCopy.departmentDescription = 'Department description is required'
      valid = false
    }

    setErrors(errorCopy)
    return valid
  }

  function handleSaveOrUpdateEmployee(e) {
    e.preventDefault()

    const department = { departmentName, departmentDescription }

    if (validateForm()) {
      if (id) {
        updateDepartment(id, department)
          .then((response) => {
            console.log(response.data)
            navigator('/departments')
          })
          .catch((error) => console.error(error))
      } else {
        createDepartment(department)
          .then((response) => {
            console.log(response.data)
            navigator('/departments')
          })
          .catch((error) => console.error(error))
      }
    }
  }

  useEffect(() => {
    if (id) {
      getDepartment(id)
        .then((response) => {
          setDepartmentName(response.data.departmentName)
          setDepartmentDescription(response.data.departmentDescription)
        })
        .catch((error) => console.log(error))
    }
  }, [id])

  return (
    <div className="card w-50 mx-auto mt-5">
      <h3 className="card-header text-center">{pageTitle()}</h3>
      <div className="card-body">
        <form>
          <div className="mb-3">
            <label className="form-label">Department Name</label>
            <input
              type="text"
              className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
              name="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
            {errors.departmentName && (
              <div className="invalid-feedback">{errors.departmentName}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Department Description</label>
            <input
              type="text"
              className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
              name="departmentDescription"
              value={departmentDescription}
              onChange={(e) => setDepartmentDescription(e.target.value)}
            />
            {errors.departmentDescription && (
              <div className="invalid-feedback">{errors.departmentDescription}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={handleSaveOrUpdateEmployee}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

export default Department
