import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

const Login = () => {
  const customerRef = useRef(null);
  const pwdRef = useRef(null);
  const [input, setInput] = useState({
    customer: "",
    pwd: "",
    saveCustomer: false,
  });
  // 쿠키선언
  const [cookies, setCookie, removeCookie] = useCookies(["customer"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.account) {
      customerRef.current.value = cookies.customer;
      setInput({ ...input, customer: cookies.customer, saveCustomer: true });
      pwdRef.current.focus();
    } else {
      customerRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputChanged = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const checkChanged = (e) => {
    setInput({ ...input, [e.target.id]: e.target.checked });
  };

  const inputKeyDown = (e) => {
    if (e.key !== "Enter") return;

    loginBtnClicked();
  };

  // 로그인
  const loginBtnClicked = async () => {
    const { customer, pwd, saveCustomer } = input;

    if (customer.length <= 0 || pwd.length <= 0) return;

    const result = await axios.get("/login", { params: { customer, pwd } });

    // 고객명 저장에 체크되었다면 쿠키에 고객명을 저장한다.
    if (saveCustomer) {
      setCookie("customer", customer);
    } else {
      removeCookie("customer");
    }

    if (result.data === "failed") {
      toast("고객명과 비밀번호를 확인해 주세요!!");
    } else {
      sessionStorage.setItem("customer", customer);

      if(customer === "admin") {
        navigate("/allSettops");
      } else {
        navigate("/settops");
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="border pt-4 pb-2 text-center bg-light shadow rounded-3"
        style={{ width: "300px" }}
      >
        <p>RiccoBoard set-top IP 확인</p>
        <p>
          <input
            type="text"
            id="customer"
            ref={customerRef}
            placeholder="고객명"
            autoComplete="off"
            onChange={inputChanged}
            onKeyDown={inputKeyDown}
            style={{ outline: "none" }}
          />
        </p>
        <p>
          <input
            type="password"
            id="pwd"
            ref={pwdRef}
            placeholder="비밀번호"
            onChange={inputChanged}
            onKeyDown={inputKeyDown}
            style={{ outline: "none" }}
          />
        </p>
        <p className="mt-4">
          <input
            type="checkbox"
            id="saveAccount"
            onClick={checkChanged}
            style={{ cursor: "pointer" }}
            className="me-1"
            checked={input.saveCustomer}
          />
          <label
            htmlFor="saveAccount"
            style={{ cursor: "pointer", webkitUserSelect: "none" }}
          >
            고객명 저장
          </label>
          <button
            className="btn btn-primary mx-3 shadow"
            onClick={loginBtnClicked}
          >
            로그인
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
