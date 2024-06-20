import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Header from "./Header";
import Login from "../views/Login";
import Settops from "../views/Settops";
import Account from "../views/Account";
import AllSettops from "../views/AllSettops";
import AddCustomer from "../views/AddCustomer";

const Ground = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/allSettops" element={<AllSettops />} />
        <Route path="/customerList" element={<AddCustomer />} />
        <Route path="/settops" element={<Settops />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={1000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        // pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        // pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
    </BrowserRouter>
  )
};

export default Ground;
