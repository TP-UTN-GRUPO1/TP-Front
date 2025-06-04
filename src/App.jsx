import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import CardPage from "./components/cardPage/CardPage";
import Dashboard from "./components/dashboard/Dashboard";
import Err from "./components/err/Err";
import Cart from "./components/cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContextProvider";
import { CartProvider } from "./components/cartContext/CartContext";
import LayoutNavbar from "./components/nav/LayoutNavbar";

function App() {
  return (
    <>
      <AuthContextProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<LayoutNavbar hideUserButtons={true} />}>
                <Route path="/cart" element={<Cart />} />
                <Route path="/games/:id" element={<CardPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<Err />} />
              </Route>
              <Route element={<LayoutNavbar />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
