import { useEffect, useState } from 'react'
import { deleteDepartment, listDepartments } from '../services/DepartmentService'
import { useNavigate } from 'react-router-dom'

const ListDepartment = () => {
  const [departments, setDepartments] = useState([])
  const navigation = useNavigate()

  function getDepartmentList() {
    listDepartments()
      .then((response) => {
        setDepartments(response.data)
      })
      .catch((error) => console.error(error))
  }

  function addNewDepartment() {
    navigation('/add-department')
  }

  function handleUpdateDepartment(id) {
    navigation(`/edit-department/${id}`)
  }

  function handleDeleteDepartment(id) {
    deleteDepartment(id)
      .then((response) => {
        console.log(response.data)
        getDepartmentList()
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getDepartmentList()
  }, [])

  return (
    <div className="mx-auto w-75 py-5">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-center">List of Departments</h3>
        <button
          className="btn btn-primary"
          onClick={addNewDepartment}
        >
          Add Department
        </button>
      </div>
      <table className="table border table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Department Name</th>
            <th scope="col">Department Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <th scope="row">{department.id}</th>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => handleUpdateDepartment(department.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => handleDeleteDepartment(department.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListDepartment
