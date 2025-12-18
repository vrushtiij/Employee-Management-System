import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./updateEmployee.css";

const UpdateEmployee = () => {
  const { employee_id } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);
  const [formData, setFormData] = useState({
    e_name: "",
    email: "",
    phone: "",
    job_title: "",
    address: "",
    image_url: ""
  });

  useEffect(() => {
    fetchEmployee();
  }, [employee_id]);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(
        `https://web-production-c58ab.up.railway.app/view/${employee_id}`, { withCredentials: true }
      );
      const data = Array.isArray(res.data) ? res.data[0] : res.data;

      setOriginalData(data);
      setFormData({
        e_name: data.e_name,
        email: data.email,
        phone: data.phone,
        job_title: data.job_title,
        address: data.address,
        image_url: data.image_url
      });
    } catch (err) {
      toast.error("Failed to load employee data");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const hasChanges = () => {
    return Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasChanges()) {
      toast.info("No changes saved");
      return;
    }

    try {
      await axios.put(
        `https://web-production-c58ab.up.railway.app/update/${employee_id}`,
        formData, 
        {withCredentials: true}
      );
      toast.success("Employee updated successfully");
      navigate(-1);
    } catch (err) {
      toast.error("Failed to update employee");
      console.error(err);
    }
  };

  if (!originalData) return <p>Loading...</p>;

  return (
    <div className="update-employee-page">
      <div className="form-header">
        <h2>Update Employee</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <form className="employee-form horizontal-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name</label>
          <input
            type="text"
            name="e_name"
            value={formData.e_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Job Title</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label>Employee Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
