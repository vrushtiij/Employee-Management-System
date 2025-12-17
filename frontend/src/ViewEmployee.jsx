import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./ViewEmployee.css";

const ViewEmployee = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [work, setWork] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  useEffect(() => {
    fetchWork();
  }, [])

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`https://your-backend.up.railway.app/view/${employee_id}`,{ withCredentials: true });
      setEmployee(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWork = async () => {
    try{
      const res = await axios.get(`https://your-backend.up.railway.app/${employee_id}`,{ withCredentials: true });
      setWork(Array.isArray(res.data) ? res.data[0] : res.data);
    } catch (err) {
      console.error(err);
  }
};

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`https://your-backend.up.railway.app/${employee_id}`, {withCredentials: true});
      toast.success("Employee deleted"), {autoclose: 1000};
      navigate("/View_All");
    } catch (err) {
      toast.error("Failed to delete employee");
    }
  };

  if (!employee) return <p>Loading...</p>;

  return (
    <div className="view-employee-page">
      <button className="vback-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="actions">
          <button
            className="update-btn"
            onClick={() => navigate(`/update/${employee_id}`)}
          >
            Update Employee
          </button>

          <button className="delete-btn" onClick={handleDelete}>
            Delete Employee
          </button>
        </div>

      <div className="employee-card">
        <h2>Personal Information</h2>
        <img src={employee.image_url} alt="employee image" className="emp_img" />
        <div className="detail"><span>Name:</span> {employee.e_name}</div>
        <div className="detail"><span>Email:</span> {employee.email}</div>
        <div className="detail"><span>Phone:</span> {employee.phone}</div>
        <div className="detail"><span>Job Title:</span> {employee.job_title}</div>
        <div className="detail"><span>Address:</span> {employee.address}</div>

      </div>

      <div className="employee-card">
        <h2>Employee Details</h2>
        <div className="detail"><span>Department:</span> {work.dept}</div>
        <div className="detail"><span>Designation:</span> {work.designation}</div>
        <div className="detail"><span>Salary:</span> {work.salary}</div>
        <div className="detail"><span>Experience (in yrs):</span> {work.experience}</div>
        <div className="detail"><span>Highest level of Education:</span> {work.education}</div>
        
      </div>
    </div>
  );
};

export default ViewEmployee;
