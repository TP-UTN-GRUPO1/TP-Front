import { Outlet, Link } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { useContext } from "react";
import { AuthContext } from "../../auth/Auth.Context";

const Dashboard = () => {
  const {userRole}= useContext(AuthContext)
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Mi Cuenta</h1>
      <div className={styles.buttonGroup}>
        <Link to="account" className={styles.navButton}>
          Mis Datos
        </Link>
        <Link to="purchasedHistory" className={styles.navButton}>
          Historial de compras
        </Link>
        {userRole=== 1 && 
         ( <Link to="user" className={styles.navButton}>
          Panel de usuarios
        </Link>
      )}

       {( userRole===1 || userRole=== 3) && (
          <>
         <Link to="products" className={styles.navButton}>
          Agregar producto
        </Link>
        <Link to="modifyproducts" className={styles.navButton}>
          Modificar producto
        </Link>
        </>
        )}
        <Link to="/" className={styles.backButton}>
          Volver
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
