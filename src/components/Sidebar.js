import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column p-3 mt-3"
      style={{ width: "220px", backgroundColor: "#30599c", minHeight: "30vh" }}
    >
      <h5 className="mb-4 text-white fw-bold">Menu</h5><strong><hr /></strong>

      <ul className="nav nav-pills flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white fw-bold">
            Dashboard
          </Link>
        </li>

        <li className="nav-item mb-2">
          <Link to="/companies" className="nav-link text-white fw-bold">
            Companies
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/addEmployee" className="nav-link text-white fw-bold">
            Add Employee
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link to="/employees" className="nav-link text-white fw-bold">
            Employees
          </Link>
        </li>

        
      </ul>
    </div>
  );
}
