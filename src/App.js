import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout";
import Dashboard from "./Pages/Dashboard";
import Companies from "./Pages/Companies";
import Employees from "./Pages/Employees";
import AddEmployee from "./Pages/AddEmployee";
import CompanyDetails from "./Pages/CompanyDetails";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/company/:id" element={<CompanyDetails />} />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
