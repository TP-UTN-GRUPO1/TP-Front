import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import "./Err.css"
const Unauthorized = () => {
  return (
    <div>
        <>
        <h1 className="error-heading">Error 401 usuario no autorizado </h1>
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

export default Unauthorized