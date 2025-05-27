/*El objetivo de este componente es crear un panel donde el usuario/admin/sysadmin puedan modificar datos segun el role
asigando es decir que el usuario solo pueda ver mis datos e historial de compras (este ultimo podriamos hacerlo solo si llegamos
con lo importante), el admin ...usuario , historial,productos y el sysadmin todas las funciones mas que nada la de modificar usuarios */

import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div>
        <h1>Mi Cuenta</h1>
        <>
        <button>Mis Datos</button>
        </>  
        <>
        <button>Historial de compras</button>
        </>
        <>
        <button>Modificar Usuarios</button>
        </>   
        <>
        <button>Modificar productos</button>         
        </>
        <>
        <Link to="/">Volver</Link>
        </>
    </div>
  )
}

export default Dashboard