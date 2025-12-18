import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./viewAllEmployees.css";

const ViewAllEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("https://web-production-c58ab.up.railway.app/view", {withCredentials: true});
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  return (
    <div className="view-all-page">
      <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>
      <h2>All Employees</h2>
      <div className="button-row">
      <button className="add_emp" onClick={()=>navigate('/empNav')}>Add Employee</button>
      </div>
      <table className="employee-table">
        <thead>
          <tr>
           <th>Employee</th>
            <th>ID</th>
            <th>Name</th>
            <th>Job Title</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.employee_id}
              onClick={() => navigate(`/view/${emp.employee_id}`, {withCredentials: true})}
            >
              <td><img src={emp.image_url} className="avatar"/></td>
              <td>{emp.employee_id}</td>
              <td>{emp.e_name}</td>
              <td>{emp.job_title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllEmployees;
