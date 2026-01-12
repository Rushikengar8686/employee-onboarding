import React from "react";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg"style={{ backgroundColor: "#30599c"}}>
      <div className="container-fluid">
        <a className="navbar-brand text-white fw-bold" href="/">
          Employee Onboarding
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white fw-bold" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
