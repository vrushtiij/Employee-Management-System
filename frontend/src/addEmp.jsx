import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const AddEmpNav = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "Personal Information", subtitle: "Add employee's personal details", route: "/add" },
    { title: "Employee Details", subtitle: "Add employee's work details", route: "/addEmp" }
  ];

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">+ Add Employee</h2>

      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="dashboard-card"
            onClick={() => navigate(card.route)}
          >
            <h3>{card.title}</h3>
            <p>{card.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddEmpNav;
