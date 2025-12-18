import React, { useEffect, useState } from "react";
import "./add_employee.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmpDetails = () => {
  const navigate = useNavigate();
  const [EmpIds, setEmpIds] = useState([]);
  const [formData, setFormData] = useState({
    emp_id: "", 
    dept: "",
    desg: "",
    salary: "",
    experience: "",
    education: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.emp_id) {
        newErrors.emp_id = "Employee ID is required";
    }
    if (!formData.dept.trim()) { newErrors.dept = "Department is required"; }
    if (!formData.desg.trim()) { newErrors.desg = "Designation is required"; }
    if (!formData.salary.trim()) { newErrors.salary = "Salary is required"; }
    if (!formData.experience.trim()) { newErrors.experience = "Experience is required"; }
    if (!formData.education.trim()) { newErrors.education = "Education is required"; }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

    const getEmpIds = async () => {
        try{
            const res = await axios.get("https://web-production-c58ab.up.railway.app/retrieve_id", {withCredentials: true});
            if (Array.isArray(res.data)) {
                setEmpIds(res.data);
            } else {
                console.error("API did not return an array of employee IDs:", res.data);
            }
        }
        catch (err) {
            console.error("Error fetching employee IDs:", err);
        }
    };
    
    useEffect(() => {
        getEmpIds();
    }, [])

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("https://your-backend.up.railway.app/addWork", formData,
        { withCredentials: true }
      );
      if (res.data.success) {
      toast.success("Employee Details added successfully");
      navigate(-1);
    } else {
      toast.error(res.data.message);
    }
    } catch (err) {
      toast.error("Failed to add employee details");
      console.error(err);
    }
  };

return (
    <div className="add-employee-page">
      <div className="form-header">
        <h2> + Add Employee Details</h2>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
    <form className="employee-form horizontal-form" onSubmit={handleSubmit}>
    <div><h2>Employee Details</h2></div>

        <div className="form-row">
          <label htmlFor="emp_id">Employee Id</label> 
          <div>
            <select
              id="emp_id" 
              name="emp_id" 
              value={formData.emp_id} 
              onChange={handleChange}
              className="dropdown"
            >
            <option value="">-- Select Employee ID --</option>
            {EmpIds.map((item) => (
            <option key={item.employee_id} value={item.employee_id}>
                {item.employee_id}
            </option>
            ))}
            </select>
            {errors.emp_id && <span className="error">{errors.emp_id}</span>}
          </div>
        </div>

        <div className="form-row">
          <label>Department Name</label>
          <div>
            <input
              type="text"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
            />
            {errors.dept && <span className="error">{errors.dept}</span>} 
          </div>
        </div>

        <div className="form-row">
          <label>Designation</label>
          <div>
            <input
              type="text" 
              name="desg"
              value={formData.desg}
              onChange={handleChange}
            />
            {errors.desg && <span className="error">{errors.desg}</span>} 
          </div>
        </div>

        <div className="form-row">
          <label>Salary</label>
          <div>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
            {errors.salary && <span className="error">{errors.salary}</span>} 
          </div>
        </div>

        <div className="form-row">
          <label>Experience (in yrs)</label>
          <div>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
            {errors.experience && (
              <span className="error">{errors.experience}</span> 
            )}
          </div>
        </div>

        <div className="form-row">
          <label>Highest level of education</label>
          <div>
            <textarea
              name="education"
              value={formData.education}
              onChange={handleChange}
            />
            {errors.education && (
              <span className="error">{errors.education}</span> 
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

export default EmpDetails;
