import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../api/apiService";
import { toast } from "react-toastify";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone1: "",
    department: 0,
    designation: 0,
    company: 0,
    dateOfJoining: "",
    salary: "",
    bankAccountNo: "",
    bankName: "",
    bankIfscCode: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const payload = {
      // form data
      ...form,

      // REQUIRED DEFAULT FIELDS (backend-safe)
      employeeId: 0,
      gender: "",
      maritalStatus: "",
      nationality: "",
      dateOfBirth: null,
      age: 0,
      presentAddress: "",
      permanentAddress: "",
      aadharNo: "",
      panCardNo: "",
      employmentStatus: "Active",

      // arrays
      employeeFamilyMembers: [],
      employeeExperiences: [],
    };

    addEmployee(payload)
      .then(() => {
        toast.success("Employee added successfully");

        // ✅ Redirect to Employees page
        navigate("/employees");
      })
      .catch(() => {
        toast.error("Failed to add employee");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header">
          <h5 className="mb-0">Add Employee</h5>
        </div>

        <div className="card-body">
          {/* BASIC INFO */}
          <h6 className="text-primary mb-3">Basic Information</h6>

          <div className="row mb-3">
            <div className="col-md-6">
              <input
                name="fullName"
                className="form-control"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                name="phone1"
                className="form-control"
                placeholder="Phone Number"
                value={form.phone1}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* JOB DETAILS */}
          <h6 className="text-primary mb-3">Job Details</h6>

          <div className="row mb-3">
            <div className="col-md-4">
              <input
                name="department"
                type="number"
                className="form-control"
                placeholder="Department ID"
                value={form.department}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="designation"
                type="number"
                className="form-control"
                placeholder="Designation ID"
                value={form.designation}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="company"
                type="number"
                className="form-control"
                placeholder="Company ID"
                value={form.company}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                name="dateOfJoining"
                type="date"
                className="form-control"
                value={form.dateOfJoining}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <input
                name="salary"
                type="number"
                className="form-control"
                placeholder="Salary"
                value={form.salary}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* BANK DETAILS */}
          <h6 className="text-primary mb-3">Bank Details</h6>

          <div className="row mb-4">
            <div className="col-md-4">
              <input
                name="bankAccountNo"
                className="form-control"
                placeholder="Account Number"
                value={form.bankAccountNo}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="bankName"
                className="form-control"
                placeholder="Bank Name"
                value={form.bankName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <input
                name="bankIfscCode"
                className="form-control"
                placeholder="IFSC Code"
                value={form.bankIfscCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* ACTION */}
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
