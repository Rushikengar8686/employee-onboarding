import axios from "axios";
import { data } from "react-router-dom";

const BASE_URL = "https://api.freeprojectapi.com";

// COMPANIES
export const getCompanies = () =>
  axios.get(`${BASE_URL}/api/EmployeeOnboarding/GetCompanies`);

export const getCompanyById = (id) =>
  axios.get(`${BASE_URL}/api/EmployeeOnboarding/GetCompanybyid?id=${id}`);

export const addCompany = (data) =>
  axios.post(`${BASE_URL}/api/EmployeeOnboarding/PostCompany`, data);

export const updateCompany = (id, data) =>
  axios.put(`${BASE_URL}/api/EmployeeOnboarding/PutCompany?id=${id}`, data);

export const deleteCompany = (id) =>
  axios.delete(`${BASE_URL}/api/EmployeeOnboarding/DeleteCompany?id=${id}`);

// EMPLOYEES
export const getEmployees = () =>
  axios.get(`${BASE_URL}/api/EmployeeOnboarding/GetEmployees`);

//Add Employee
export const addEmployee = (data) =>
  axios.post(`${BASE_URL}/api/EmployeeOnboarding/register`, data);

// Edit Employee Details
export const UpdateEmployeeDetails = (id,data)=>{
  axios.put(`${BASE_URL}/api/EmployeeOnboarding/${id}`,data)
}

// Delete Employee
export const deleteEmployee = (id) =>
  axios.delete(`${BASE_URL}/api/EmployeeOnboarding/${id}`);

// Filter Employye
export const filterEmployees = (payload) =>
  axios.post(
    `${BASE_URL}/api/EmployeeOnboarding/filterEmployees`,
    payload
  );

