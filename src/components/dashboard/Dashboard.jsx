import { Outlet, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth/Auth.Context";
import { useTranslate } from "../../hooks/useTranslate";

const Dashboard = () => {
  const { userRole } = useContext(AuthContext);
  const translate = useTranslate();
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>{translate("My_Account")}</h1>
      <div className={styles.buttonGroup}>
        <Link to="account" className={styles.navButton}>
          {translate("Data")}
        </Link>
        <Link to="purchasedHistory" className={styles.navButton}>
          {translate("Pucharse_history")}
        </Link>
        {userRole === 1 && (
          <Link to="user" className={styles.navButton}>
            {translate("User_dashboard")}
          </Link>
        )}

        {(userRole === 1 || userRole === 3) && (
          <>
            <Link to="products" className={styles.navButton}>
              {translate("Add_product")}
            </Link>
            <Link to="modifyproducts" className={styles.navButton}>
              {translate("Modify_product")}
            </Link>
          </>
        )}
        {(userRole === 1 || userRole === 3) && (
          <>
            <Link to="platforms" className={styles.navButton}>
              {translate("Add_platform")}
            </Link>
          </>
        )}

        <Link to="/" className={styles.backButton}>
          {translate("Return")}
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
