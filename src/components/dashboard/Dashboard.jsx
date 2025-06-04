import { Link } from "react-router-dom";

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
          <Link to="user">Modificar Usuarios</Link>
        </button>
      </div>
      <div>
        <button>
          <Link to="products">Modificar productos</Link>
        </button>
      </div>
      <div>
        <Link to="/">Volver</Link>
      </div>
    </div>
  );
};

export default Dashboard;
