import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import { CartProvider } from "./components/CartContext/CartContext";
import DetailCard from "./components/detailCard/DetailCard";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Err from "./components/err/Err";
import Cart from "./components/cart/Cart";
import AnimatedBackground from "./components/AnimatedBackground/AnimatedBackground.jsx";

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <AnimatedBackground />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/games/:id" element={<DetailCard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Err />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
