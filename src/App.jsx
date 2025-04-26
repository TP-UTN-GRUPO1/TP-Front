import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>
      <div style={{ height: "1000px" }}>
        <p>Contenido de prueba</p>
      </div>

      <Footer></Footer>
    </>
  );
}

export default App;
