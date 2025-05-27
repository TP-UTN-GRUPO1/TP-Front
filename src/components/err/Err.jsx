import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import "./Err.css"
const Err = () => {
  return (
    <div>
        <>
        <h1 className="error-heading">Ops...error 404 Sitio no encontrado </h1>
        </>
    <div className="d-flex gap-2 mb-2">
        <Link to="/">
        <Button variant="secondary" size="lg">
          Volver
        </Button>
        
        </Link>
    </div>
        
    </div>
  )
}

export default Err