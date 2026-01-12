import { useEffect, useState } from "react";
import { getCompanies, getEmployees } from "../api/apiService";

export default function Dashboard() {
  const [companies, setCompanies] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    getCompanies().then((res) => setCompanies(res.data));

    getEmployees().then((res) => {
      setEmployees(res.data);

      setPending(res.data.filter(e => e.status === "Pending").length);
      setCompleted(res.data.filter(e => e.status === "Completed").length);
    });
  }, []);

  // pagination logic
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentEmployees = employees.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(employees.length / recordsPerPage);

  return (
    <div className="container mt-4">

      {/* ===== DASHBOARD CARDS ===== */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Companies</h5>
              <h2>{companies.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-white shadow" style={{ backgroundColor: "#ff9800" }}>
            <div className="card-body text-center">
              <h5>Pending</h5>
              <h2>{pending}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Completed</h5>
              <h2>{completed}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* ===== EMPLOYEE TABLE ===== */}
      <div className="card shadow mt-5">
        <div className="card-header">
          <h5 className="mb-0">Employees List</h5>
        </div>

        <div className="card-body p-0">
          <table className="table table-hover mb-0 text-center">
            <thead className="table-secondary text-center">
              <tr>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Designation</th>
              </tr>
            </thead>

            <tbody>
              {currentEmployees.length > 0 ? (
                currentEmployees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.fullName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.designation}</td>
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

        {/* ===== PAGINATION ===== */}
        <div className="card-footer d-flex justify-content-center">
          <nav>
            <ul className="pagination mb-0">

              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </li>

            </ul>
          </nav>
        </div>
      </div>

    </div>
  );
}
