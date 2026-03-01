import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { useTranslate } from "../../hooks/useTranslate";

const DashboardSidebar = ({ onClose }) => {
  const { name, userRole } = useContext(AuthContext);
  const translate = useTranslate();
  const role = Number(userRole);
  console.log(
    "🎯 Sidebar - userRole:",
    userRole,
    "| type:",
    typeof userRole,
    "| role:",
    role,
  );

  const linkClass = ({ isActive }) =>
    `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span className={styles.welcomeHi}>
          {translate("Hello")} {name || translate("User")}
        </span>
        <span className={styles.welcomeSub}>{translate("Welcome_msg")}</span>
      </div>

      <nav className={styles.sidebarNav}>
        <NavLink to="account" className={linkClass} onClick={onClose}>
          <span className={styles.sidebarIcon}>👤</span>
          {translate("Data")}
        </NavLink>

        <NavLink to="purchasedHistory" className={linkClass} onClick={onClose}>
          <span className={styles.sidebarIcon}>🛒</span>
          {translate("Pucharse_history")}
        </NavLink>

        {role === 1 && (
          <NavLink to="user" className={linkClass} onClick={onClose}>
            <span className={styles.sidebarIcon}>👥</span>
            {translate("User_dashboard")}
          </NavLink>
        )}

        {(role === 1 || role === 2) && (
          <>
            <NavLink to="products" className={linkClass} onClick={onClose}>
              <span className={styles.sidebarIcon}>➕</span>
              {translate("Add_product")}
            </NavLink>

            <NavLink
              to="modifyproducts"
              className={linkClass}
              onClick={onClose}
            >
              <span className={styles.sidebarIcon}>✏️</span>
              {translate("Modify_product")}
            </NavLink>

            <NavLink to="platforms" className={linkClass} onClick={onClose}>
              <span className={styles.sidebarIcon}>🎮</span>
              {translate("Platform_Management")}
            </NavLink>

            <NavLink to="genres" className={linkClass} onClick={onClose}>
              <span className={styles.sidebarIcon}>🏷️</span>
              {translate("Genre_Management")}
            </NavLink>
          </>
        )}
      </nav>

      <div className={styles.sidebarFooter}>
        <NavLink to="/" className={styles.sidebarBackLink}>
          ← {translate("Return")}
        </NavLink>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
