import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import CardPage from "./components/cardPage/CardPage";
import Dashboard from "./components/dashboard/Dashboard";
import Err from "./components/err/Err";
import Cart from "./components/cart/Cart";
import Contact from "./components/contactForm/ContactForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContextProvider";

import LayoutNavbar from "./components/nav/LayoutNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/cartContext/CartContext";
import Favorites from "./components/favorites/favorites";

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutNavbar hideUserButtons={true} />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/games/:id" element={<CardPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<Favorites/>}/>
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Err />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="user" element={<Dashboard />} />
              <Route path="products" element={<Dashboard />} />
              <Route path="purchasedHistory" element={<Dashboard />} />
              <Route path="account" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
