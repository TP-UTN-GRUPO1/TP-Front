import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import GigantCarrousel from "./components/gigantCarrousel/gigantCarrousel";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar></Navbar>
      <GigantCarrousel></GigantCarrousel>
      <div>
        <p>ESPACIO</p>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
