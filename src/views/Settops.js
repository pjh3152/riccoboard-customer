import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import Spinner from "../components/Spinner";

const Settops = () => {
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {    
    getList();
  },[]);

  const getList = async () => {
    setLoad(true);
    const result = await axios.get(
      "/settops/" + sessionStorage.getItem("customer")
    );    
    if (result.data.length > 0 && result.data !== "failed") {
      setList(result.data);
    }
    setLoad(false);
  };

  // 새로고침
  const reload = () => {
    setList([]);
    getList();
  };

  // IP 클립보드 복사
  const copyClipBoard = (ip) => {
    navigator.clipboard.writeText(ip);
    toast("복사되었습니다 (" + ip + ")");
  }

  return (
    <div className="container mt-4">
      <Spinner load={load} />
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center d-flex justify-content-end py-2 pe-3">
          <div title="새로고침" onClick={reload} style={{cursor:'pointer'}}><i class="bi bi-arrow-clockwise"></i></div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-2 bg-black bg-opacity-25 text-center py-2 shadow">
          Set-top Name
        </div>
        <div className="col-lg-2 bg-black bg-opacity-25 text-center py-2 shadow">
          IP Address
        </div>
        <div className="col-lg-2 bg-black bg-opacity-25 text-center py-2 shadow">
          DateTime
        </div>
      </div>
      {list.map((data) => {
        return (
          <div className="row justify-content-center">
            <div className="col-lg-2 bg-black bg-opacity-10 py-2">
              {data.d_device}
            </div>
            <div className="col-lg-2 bg-black bg-opacity-10 text-center py-2">
              {data.d_ip}
              <i className="bi bi-copy ms-3" title="복사" onClick={() => copyClipBoard(data.d_ip)} style={{cursor:'pointer'}}></i>
            </div>
            <div className="col-lg-2 bg-black bg-opacity-10 text-center py-2">
              {data.d_datetime}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Settops;
