import {Outlet, Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>Mi Cuenta</h1>
      <div>
        <button>
          <Link to="account">Mis Datos</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="purchasedHistory">Historial de compras</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="user">Panel de usuarios</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="products">Agregar producto</Link>
        </button><button>
          <Link to="modifyproducts">Modificar producto</Link>
        </button>
      </div>
      <div>
        <Link to="/">Volver</Link>
      </div>
      <Outlet/>
    </div>
  );
};
 export default  Dashboard;