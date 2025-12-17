import React from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "View All Employees", subtitle: "View all employee details", route: "/View_All" },
  ];

  return (
    <div className="dashboard-page">
      <h2 className="dashboard-title">Employee Management System</h2>

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

export default Dashboard;
