import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const Account = () => {

  const inputRef = useRef(null);
  const [input, setInput] = useState({
    pwd:"",
    pwd2:"",
    pwd3:""
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const inputChanged = (e) => {
    setInput({...input, [e.target.id]:e.target.value});
  }

  const inputKeyDown = (e) => {
    if(e.key !== "Enter") return;
    changeAccount();
  }

  // 비밀번호 변경
  const changeAccount = () => {
    const {pwd, pwd2, pwd3} = input;

    if(pwd.length <= 0) {
      toast.warning("현재 비밀번호를 입력해 주세요!");
      return;
    }
    if(pwd2.length <= 0) {
      toast.warning("새 비밀번호를 입력해 주세요!");
      return;
    }
    if(pwd3.length <= 0) {
      toast.warning("새 비밀번호 확인을 입력해 주세요!");
      return;
    }
    if(pwd === pwd2) {
      toast.warning("현재 비밀번호와 새 비밀번호가 동일합니다!");
      return;
    }
    if(pwd2 !== pwd3) {
      toast.warning("새 비밀번호와 비밀번호 확인이 다릅니다!");
      return;
    }

    const result = axios.get("/changeAccount", {params:{account:sessionStorage.getItem("account"), pwd, pwd2}});

    if(result.data === "failed") {
      toast.error("현재 비밀번호가 일치하지 않습니다!");
    } else {
      toast.success("비밀번호를 변경했습니다!");
    }
    setInput({...input, pwd:"",pwd2:"",pwd3:""});
    inputRef.current.focus();
  }

  return (
    <div className="d-flex flex-column border m-auto align-items-center mt-5 pt-4 pb-2 rounded-3 shadow" style={{width:'250px'}}>
      <p>
        <input
          type="password"
          id="pwd"
          placeholder="현재 비밀번호"
          style={{ outline: "none" }}
          ref={inputRef}
          onChange={inputChanged}
          onKeyDown={inputKeyDown}
          value={input.pwd}
        />
      </p>
      <p>
        <input
          type="password"
          id="pwd2"
          placeholder="새 비밀번호"
          style={{ outline: "none" }}
          onChange={inputChanged}
          onKeyDown={inputKeyDown}
          value={input.pwd2}
        />
      </p>
      <p>
        <input
          type="password"
          id="pwd3"
          placeholder="새 비밀번호 확인"
          style={{ outline: "none" }}
          onChange={inputChanged}
          onKeyDown={inputKeyDown}
          value={input.pwd3}
        />
      </p>
      <p><button onClick={changeAccount} className="btn btn-primary shadow mt-2">비밀번호 변경</button></p>
    </div>
  );
};

export default Account;
