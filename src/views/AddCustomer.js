import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const AddCustomer = () => {
  const [state, setState] = useState("Add");
  const [list, setList] = useState([]);
  const [load, setLoad] = useState(false);
  const customerRef = useRef(null);
  const pwdRef = useRef(null);
  const [input, setInput] = useState({
    idx: "",
    customer: "",
    pwd: ""
  });

  useEffect(() => {
    customerRef.current.focus();
    getList();
  }, []);

  const getList = async () => {
    setLoad(true);
    const result = await axios.get("/customerList");
    if (result.data.length > 0 && result.data !== "failed") {
      setList(result.data);
    }
    setLoad(false);
  };

  const inputChanged = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const inputKeyDown = (e) => {
    if (e.key !== "Enter") return;
    addCustomer();
  };

  // 등록 or 수정
  const addCustomer = async () => {
    const {idx, customer, pwd} = input;

    if(customer.length <= 0 || pwd.length <= 0) return;

    setLoad(true);
    if(state === "Add") {
      const result = await axios.post("/addCustomer", {customer, pwd});
      if (result.data.length > 0) {
        if(result.data === "same") {
          setLoad(false);
          toast.warning("이미 동일한 고객명이 존재합니다!");
        }
      }
    } else {
      const result = await axios.put("/editCustomer", {idx, customer, pwd});
      if (result.data.length > 0) {
        if(result.data === "same") {
          setLoad(false);
          toast.warning("이미 동일한 고객명이 존재합니다!");
        }
      }
    }
    clearCustomer();
    setLoad(false);

    getList();
  }

  // 목록선택
  const viewCustomer = (idx, customer, pwd) => {
    customerRef.current.value = customer;
    pwdRef.current.value = pwd;
    setInput({...input, idx, customer, pwd});
    setState("Edit");
  }

  // 삭제
  const deleteCustomer = async () => {
    await axios.delete("/deleteCustomer", {params:{idx:input.idx}});
    clearCustomer();
    getList();
  }

  // Clear
  const clearCustomer = () => {
    customerRef.current.value = "";
    pwdRef.current.value = "";
    customerRef.current.focus();
    setState("Add");
  }

  return (
    <div className="container mt-4">
      <Spinner load={load} />
      <div className="row justify-content-center">
        <div className="col-lg text-center d-flex justify-content-center py-2 pe-3">
          <input
            type="text"
            id="customer"
            ref={customerRef}
            placeholder="고객명"
            autoComplete="off"
            onChange={inputChanged}
            onKeyDown={inputKeyDown}
            className="me-3"
            style={{ outline: "none", width:"200px" }}
          />
          <input
            type="text"
            id="pwd"
            ref={pwdRef}
            placeholder="비밀번호"
            autoComplete="off"
            onChange={inputChanged}
            onKeyDown={inputKeyDown}
            className="me-3"
            style={{ outline: "none", width:"140px" }}
          />
          <button className="btn btn-primary me-2" onClick={addCustomer}>{state}</button>
          {
            state === "Edit" &&
            <button className="btn btn-primary me-2" onClick={deleteCustomer}>Delete</button>
          }
          <button className="btn btn-primary me-2" onClick={clearCustomer}>Clear</button>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-lg-2 bg-black bg-opacity-25 text-center py-2 shadow">
          Customer
        </div>
        <div className="col-lg-2 bg-black bg-opacity-25 text-center py-2 shadow">
          Password
        </div>
      </div>
      {list.map((data) => {
        return (
          <div className="row justify-content-center">
            <div className="col-lg-2 bg-black bg-opacity-10 py-2">
              <div onClick={() => viewCustomer(data.d_idx, data.d_customer, data.d_pwd)} style={{cursor:'pointer'}}>{data.d_customer}</div>
            </div>
            <div className="col-lg-2 bg-black bg-opacity-10 py-2">
              {data.d_pwd}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddCustomer;
