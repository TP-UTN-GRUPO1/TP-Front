import { Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { useTranslate } from "../../hooks/useTranslate";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const translate = useTranslate();

  return (
    <div className={styles.dashboardContainer}>
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Botón hamburguesa mobile */}
      <button
        className={styles.menuToggle}
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <div
        className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.sidebarOpen : ""}`}
      >
        <DashboardSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
