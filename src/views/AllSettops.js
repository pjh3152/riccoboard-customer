import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Swal from "sweetalert2";

const AllSettops = () => {
  let checkedValue = [];
  const [load, setLoad] = useState(false);
  const [list, setList] = useState([]);
  const checkRef = useRef([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    setLoad(true);
    const result = await axios.get("/allSettops");
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

  // Customer 클립보드 복사
  const copyClipBoard = (customer) => {
    Swal.fire({
      title: "복사되었습니다 (" + customer + ")",
      timer: 1500,
      showConfirmButton: true,
      icon: "success",
    });
  };

  // 셋탑 IP 업데이트 시간비교 (1시간 이내인지)
  const checkDateTime = (datetime) => {
    const time =
      (new Date().getTime() - new Date(datetime).getTime()) / 1000 / 60;
    if (time <= 60) {
      return true;
    } else {
      return false;
    }
  };

  // 선택 체크박스 체크
  const checkBoxChanged = () => {
    checkedValue = [];
    checkRef.current.forEach(c => {
      if(c.checked) {
        checkedValue.push(c.value);
      }
    });
  };

  // 삭제
  const deleteBtnClicked = () => {
    Swal.fire({
      title: "선택한 셋탑정보를 정말 삭제하시겠습니까?",
      text: "삭제한 데이터는 복구할 수 없습니다!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await axios.delete("/deleteSettops", {
          params: { value: checkedValue },
        });
        if(result.data === "success") {
          checkRef.current.forEach(c => {
            if(c) {
              c.checked = false;
            }
          })
          getList();
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <Spinner load={load} />
      <div className="row justify-content-center">
        <div className="col-lg-11 text-center d-flex justify-content-end align-items-center py-2 pe-3">
          <div title="새로고침" onClick={reload} style={{ cursor: "pointer" }}>
            <i class="bi bi-arrow-clockwise me-4"></i>
          </div>
          <button className="btn btn-primary" onClick={deleteBtnClicked}>
            Delete
          </button>
        </div>
      </div>
      <div className="row justify-content-center">
        <div
          className="col-lg-1 text-center text-white fw-bold py-2 shadow"
          style={{ background: "#9c88ff" }}
        >
          선택
        </div>
        <div
          className="col-lg-2 text-center text-white fw-bold py-2 shadow"
          style={{ background: "#9c88ff" }}
        >
          Customer
        </div>
        <div
          className="col-lg-2 text-center text-white fw-bold py-2 shadow"
          style={{ background: "#9c88ff" }}
        >
          Set-top Name
        </div>
        <div
          className="col-lg-2 text-center text-white fw-bold py-2 shadow"
          style={{ background: "#9c88ff" }}
        >
          IP Address
        </div>
        <div className="col-lg-2 text-center text-white fw-bold py-2 shadow" style={{background:'#9c88ff'}}>
          First Time
        </div>
        <div
          className="col-lg-2 text-center text-white fw-bold py-2 shadow"
          style={{ background: "#9c88ff" }}
        >
          Update Time
        </div>
      </div>
      {list.map((data, idx) => {
        return (
          <div className="row justify-content-center" key={idx}>
            <div
              className="col-lg-1 py-2 text-center"
              style={{ background: "#f0f0f0" }}
            >
              <input
                type="checkbox"
                value={data.d_idx}
                ref={(el) => (checkRef.current[idx] = el)}
                onChange={checkBoxChanged}
              />
            </div>
            <div className="col-lg-2 bg-black bg-opacity-10 py-2">
              {data.d_customer}
              <CopyToClipboard
                text={data.d_customer}
                onCopy={() => copyClipBoard(data.d_customer)}
              >
                <i
                  className="bi bi-copy ms-3"
                  title="복사"
                  style={{ cursor: "pointer" }}
                ></i>
              </CopyToClipboard>
            </div>
            <div className="col-lg-2 py-2" style={{ background: "#f0f0f0" }}>
              {data.d_device}
            </div>
            <div className="col-lg-2 bg-black bg-opacity-10 text-center py-2">
              {data.d_ip}
            </div>
            <div className="col-lg-2 text-center py-2" style={{ background: "#f0f0f0" }}>
              <div className="text-success">{data.d_firsttime}</div>
            </div>
            <div
              className="col-lg-2 bg-black bg-opacity-10 text-center py-2"
            >
              {checkDateTime(data.d_datetime) ? (
                <div className="text-primary">{data.d_datetime}</div>
              ) : (
                <div className="text-danger">{data.d_datetime}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllSettops;
