import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import "./Err.css"
import { useTranslate } from '../../hooks/useTranslate';
const Err = () => {
  const translate= useTranslate();
  return (
    <div>
        <>
        <h1 className="error-heading">Ops...error 404 Sitio no encontrado </h1>
        </>
    <div className="d-flex gap-2 mb-2">
        <Link to="/">
        <Button variant="secondary" size="lg">
          {translate("return")}
        </Button>
        
        </Link>
    </div>
        
    </div>
  )
}

export default Err