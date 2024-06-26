import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import Navbar from "./components/navbar/navbar";
import ProductDetail from "./pages/ProductDetail/productDetail";
import Order from "./pages/order/order";
import { Footer } from "./components/Footer/Footer";
import SellPage from "./pages/sells/sell";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<ProductDetail />} />
        <Route path="/order" element={<Order />} />
        <Route path="/sells" element={<SellPage />} />
      </Routes>
      
    </div>
  );
}

export default App;
