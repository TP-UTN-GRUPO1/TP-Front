import "./App.css";
import Home from "./components/home/Home";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import Cart from "./components/cart/Cart";
import DetailCard from "./components/detailCard/DetailCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Err from "./components/err/Err";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/games/:id" element={<DetailCard />}></Route>
          <Route path="*" element={<Err/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
