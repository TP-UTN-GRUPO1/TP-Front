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

function App() {
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/games/:id" element={<DetailCard />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="*" element={<Err />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
}

export default App;
