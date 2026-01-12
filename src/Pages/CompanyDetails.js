import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompanyById } from "../api/apiService";

export default function CompanyDetails() {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    getCompanyById(id).then((res) => setCompany(res.data));
  }, [id]);

  if (!company) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-primary">{company.companyName}</h3>
          <p><strong>Address:</strong> {company.address}</p>
          <p><strong>Pincode:</strong> {company.pinCode}</p>
        </div>
      </div>
    </div>
  );
}
