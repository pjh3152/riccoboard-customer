import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";
import Header from "./Header";
import Login from "../views/Login";
import Settops from "../views/Settops";
import Account from "../views/Account";
import AllSettops from "../views/AllSettops";
import AddCustomer from "../views/AddCustomer";
import SettopsByCustomer from "../views/SettopsByCustomer";

const Ground = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/allSettops" element={<AllSettops />} />
        <Route path="/settopsByCustomer" element={<SettopsByCustomer />} />
        <Route path="/customerList" element={<AddCustomer />} />
        <Route path="/settops" element={<Settops />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </HashRouter>
  )
};

export default Ground;
