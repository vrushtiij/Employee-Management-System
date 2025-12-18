import React, { useState } from "react";
import "./add_employee.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    e_name: "",
    email: "",
    phone: "",
    job_title: "",
    address: "",
    image_url: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.e_name.trim()) {
      newErrors.e_name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.job_title.trim()) {
      newErrors.job_title = "Job title is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.image_url.trim()) {
      newErrors.image_url = "Employee Image is required";
    }

  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("https://web-production-c58ab.up.railway.app/add", formData,
        { withCredentials: true }
      );
      if (res.data.success) {
      toast.success("Employee added successfully");
      navigate(-1);
    } else {
      toast.error(res.data.message);
    }
    } catch (err) {
      toast.error(" Failed to add employee");
      console.error(err);
    }
  };

  return (
    <div className="add-employee-page">
      <div className="form-header">
        <h2> + Add New Employee</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      <form className="employee-form horizontal-form" onSubmit={handleSubmit}>
        <div><h2>Personal Information</h2></div>
        <div className="form-row">
          <label>Name</label>
          <div>
            <input
              type="text"
              name="e_name"
              value={formData.e_name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.e_name}</span>}
          </div>
        </div>

        <div className="form-row">
          <label>Email</label>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <label>Phone</label>
          <div>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <label>Job Title</label>
          <div>
            <input
              type="text"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
            />
            {errors.job_title && (
              <span className="error">{errors.job_title}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <label>Address</label>
          <div>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
            {errors.address && (
              <span className="error">{errors.address}</span>
            )}
          </div>
        </div>

        <div className="form-row">
          <label>Employee Image URL</label>
          <div>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
            />
            {errors.image_url && (
              <span className="error">{errors.image_url}</span>
            )}
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
