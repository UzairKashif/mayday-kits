import React, { useState } from 'react';
import NextPage from '../NextPage/NextPage';
import './Dashboard.css';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* The NextPage component will serve as the background */}
      <NextPage />

      {/* The sidebar and topbar will overlay the NextPage component */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="toggle-button" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '<' : '>'}
        </button>
        {/* Rest of the sidebar content */}
      </div>

      <div className="topbar">
        {/* Topbar content */}
        <img src="../assets/bg.webp" alt="Logo" className="logo" /> {/* Ensure you have a logo image */}
        Welcome, User! {/* Example content, customize as needed */}
      </div>
    </>
  );
}

export default Dashboard;