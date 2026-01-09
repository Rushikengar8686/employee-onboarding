import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCompanies,
  addCompany,
  updateCompany,
  deleteCompany
} from "../api/apiService";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    companyId: 0,
    companyName: "",
    pinCode: "",
    address: "",
    phone: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = () => {
    getCompanies().then((res) => setCompanies(res.data));
  };

  const openAddModal = () => {
    setIsEdit(false);
    setForm({ companyName: "", pinCode: "", address: "", phone: "" });
    setShowModal(true);
  };

  const openEditModal = (company) => {
    setIsEdit(true);
    setEditId(company.companyId);
    setForm(company);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (isEdit) {
      updateCompany(editId, form)
        .then(() => {
          toast.success("Company updated successfully");
          setShowModal(false);
          loadCompanies();
        })
        .catch(() => toast.error("Update failed"));
    } else {
      addCompany(form)
        .then(() => {
          toast.success("Company added successfully");
          setShowModal(false);
          loadCompanies();
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  // Filter companies based on search
  const filteredCompanies = companies.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculation
  const indexOfLast = currentPage * companiesPerPage;
  const indexOfFirst = indexOfLast - companiesPerPage;
  const currentCompanies = filteredCompanies.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCompanies.length / companiesPerPage);

  const changePage = (page) => setCurrentPage(page);

  // Random pastel color for card
  const getRandomColor = () => {
    const pastelColors = [
      "#ffd6d6", "#d6f0ff", "#d6ffd6", "#fff0d6", "#f0d6ff",
      "#ffe6d6", "#d6fff6", "#f6d6ff","#9fc9bf"
    ];
    return pastelColors[Math.floor(Math.random() * pastelColors.length)];
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Companies</h4>

        <div className="d-flex gap-2">
          <input
            className="form-control form-control-sm"
            placeholder="Search company..."
            style={{ width: 200 }}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />

          <button className="btn btn-primary btn-sm" onClick={openAddModal}>
            + Add Company
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="row g-3">
        {currentCompanies.length > 0 ? (
          currentCompanies.map((company) => (
            <div className="col-md-4" key={company.companyId}>
              <div
                className="card shadow-sm h-100"
                style={{ cursor: "pointer", backgroundColor: getRandomColor() }}
                onClick={() => navigate(`/company/${company.companyId}`)}
              >
                <div className="card-body">
                  <h6 className="text-primary fw-bold">
                    {company.companyName}
                  </h6>
                  <p className="mb-1">{company.address}</p>
                  <small>Pincode: {company.pinCode}</small><br />
                  <small>Phone: {company.phone}</small>

                  <div
                    className="d-flex justify-content-end gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => openEditModal(company)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        deleteCompany(company.companyId)
                          .then(() => {
                            toast.success("Company deleted");
                            loadCompanies();
                          })
                          .catch(() => toast.error("Delete failed"))
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">No companies found</p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => changePage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => changePage(i + 1)}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => changePage(currentPage + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5>{isEdit ? "Edit Company" : "Add Company"}</h5>
                <button className="btn-close" onClick={() => setShowModal(false)} />
              </div>

              <div className="modal-body">
                <input className="form-control mb-2" placeholder="Company Name"
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                />
                <input className="form-control mb-2" placeholder="Pincode"
                  value={form.pinCode}
                  onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
                />
                <input className="form-control mb-2" placeholder="Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <input className="form-control" placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={handleSubmit}>
                  {isEdit ? "Update" : "Save"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
