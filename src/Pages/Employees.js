import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getEmployees,
  filterEmployees,
  deleteEmployee,
  UpdateEmployeeDetails
} from "../api/apiService";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [filters, setFilters] = useState({
    fullName: "",
    email: ""
  });

  // LOAD ALL EMPLOYEES
  useEffect(() => {
    loadAllEmployees();
  }, []);

  const loadAllEmployees = () => {
    getEmployees()
      .then((res) => setEmployees(res.data || []))
      .catch(() => console.error("Failed to load employees"));
  };

  // AUTO RESET WHEN SEARCH CLEARED
  useEffect(() => {
    if (filters.fullName === "" && filters.email === "") {
      loadAllEmployees();
    }
  }, [filters.fullName, filters.email]);

  // APPLY FILTER (NO TOAST)
  const handleSearch = () => {
  const payload = {
    employeeId: 0,
    fullName: "",
    department: 0,
    designation: 0,
    fromDateOfJoining: null,
    toDateOfJoining: null,
    email: "",
    phone1: "",
    sortBy: "fullName",
    sortDescending: false
  };

  filterEmployees(payload)
    .then((res) => {
      const data = res.data || [];
      setEmployees(data);

      if (data.length > 0) {
        toast.success("Employees found successfully");
        loadAllEmployees();
      } else {
        toast.warning("No employees found");
        
       
      }
    })
    .catch(() => {
      toast.error("Search failed");
    });
};

  // DELETE EMPLOYEE (TOAST ✔)
  const handleDelete = (id) => {
    deleteEmployee(id)
      .then(() => {
        toast.success("Employee deleted successfully");
        loadAllEmployees();
      })
      .catch(() => toast.error("Delete failed"));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">

        {/* HEADER & SEARCH */}
        <div className="card-header">
          <h5 className="mb-3">Employees</h5>

          <div className="row g-2">
            <div className="col-md-3">
              <input
                className="form-control form-control-sm"
                placeholder="Search by name"
                value={filters.fullName}
                onChange={(e) =>
                  setFilters({ ...filters, fullName: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <input
                className="form-control form-control-sm"
                placeholder="Search by email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary btn-sm w-100"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card-body p-0">
          <table className="table mb-0 text-center">
            <thead className="table-secondary">
              <tr>
                <th>Sr.No</th>
                <th>Employee Name</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length > 0 ? (
                employees.map((emp, index) => (
                  <tr key={emp.employeeId}>
                    <td>{index + 1}</td>
                    <td>{emp.fullName}</td>
                    <td>{emp.designation}</td>
                    <td>{emp.email}</td>
                    <td>
                      <button className="btn btn-sm btn-warning me-2">
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(emp.employeeId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
