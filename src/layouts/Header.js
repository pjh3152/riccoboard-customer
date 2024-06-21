import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [title, setTitle] = useState("");
  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (path.pathname === "/") return;
    if (sessionStorage.getItem("customer").length > 0) {
      setTitle(sessionStorage.getItem("customer") + " :: Set-tops Information");
    }
  }, [path.pathname]);

  const logout = () => {
    sessionStorage.removeItem("customer");
    navigate("/");
  };

  return (
    <div>
      {path.pathname !== "/" && (
        <div className="container-fluid bg-primary">
          <div className="d-flex justify-content-between py-2 shadow">
            <div className="d-flex align-items-center text-light">
              <img
                src={require("../assets/ricco.png")}
                alt="logo"
                className="rounded-circle mx-2 shadow"
                style={{ width: "30px" }}
              />{" "}
              {title}
            </div>
            {sessionStorage.getItem("customer") === "admin" ? (
              // 관리자 로그인
              <div className="d-flex align-items-center me-2 text-light">
                <Link
                  to="/allSettops"
                  className="me-4 text-light text-decoration-none"
                  title="모든셋탑"
                >
                  All Set-tops
                </Link>
                <Link
                  to="/customerList"
                  className="me-4 text-light text-decoration-none"
                  title="고객등록"
                >
                  Add Customer
                </Link>
                <Link
                  to="/account"
                  className="me-4 text-light text-decoration-none"
                  title="로그인 계정관리"
                >
                  Account
                </Link>
                <div
                  onClick={logout}
                  className="me-2"
                  style={{ cursor: "pointer" }}
                  title="로그아웃"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </div>
              </div>
            ) : (
              // 고객 로그인
              <div className="d-flex align-items-center me-2 text-light shadow">
                <Link
                  to="/settops"
                  className="me-4 text-light text-decoration-none"
                  title="셋탑정보"
                >
                  Set-tops
                </Link>
                <Link
                  to="/account"
                  className="me-4 text-light text-decoration-none"
                  title="로그인 계정관리"
                >
                  Account
                </Link>
                <div
                  onClick={logout}
                  className="me-2"
                  style={{ cursor: "pointer" }}
                  title="로그아웃"
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
