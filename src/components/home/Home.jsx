import GigantCarrousel from "../gigantCarrousel/gigantCarrousel";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <GigantCarrousel></GigantCarrousel>
      <Footer></Footer>
    </div>
  );
};

export default Home;
