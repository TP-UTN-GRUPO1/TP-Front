import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import CardPage from "./components/cardPage/CardPage";
import Dashboard from "./components/dashboard/Dashboard";
import Err from "./components/err/Err";
import Cart from "./components/cart/Cart";
import PurchasedHistory from "./components/dashboard/account/PurchasedHistory";
import Contact from "./components/contactForm/ContactForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./auth/AuthContextProvider";

import LayoutNavbar from "./components/nav/LayoutNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartProvider } from "./components/cartContext/CartContext.jsx";
import Favorites from "./components/favorites/favorites";
import Account from "./components/dashboard/account/Account.jsx";
import Newproduct from "./components/dashboard/products/Newproduct.jsx";
import ModifyProduct from "./components/dashboard/products/Modifyproduct.jsx";
import { FavoritesProvider } from "./components/FavoritesContext/FavoritesContext.jsx";
import AdminPanel from "./components/dashboard/admin/AdminPanel.jsx";
import ProtectedRoute from "./components/routes/protected/ProtectedRoute.jsx";
import Unauthorized from "./components/err/Unauthorized.jsx";

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <FavoritesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutNavbar hideUserButtons={true} />}>
              <Route path="/cart" element={ <Cart /> } />
              <Route path="/games/:id" element={<CardPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/favorites" element={<ProtectedRoute> <Favorites /> </ProtectedRoute> } />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={ <Unauthorized/> } />
            <Route path="*" element={<Err />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}>
              <Route path="user" element={<ProtectedRoute requiredRole={1}> <AdminPanel /> </ProtectedRoute>} />
              <Route path="products" element={<ProtectedRoute requiredRole={[1, 3]}><Newproduct /></ProtectedRoute>} />
              <Route path="modifyproducts" element={<ProtectedRoute requiredRole={[1, 3]}><ModifyProduct /></ProtectedRoute>} />
              <Route path="purchasedHistory" element={<PurchasedHistory />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
        </FavoritesProvider>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
