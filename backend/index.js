const express = require("express");
const db = require("./database");
const app = express();
const port = 8000;

// 클라이언트에서 보낸값을 해석한다 (JSON 형태의 body 데이터)
app.use(express.json());
app.use(express.static("build"));

app.get("/", (req, res) => {
  res.send("server is started..");
});

// 로그인
app.get("/login", async (req, res) => {
  const result = await db.execute(
    `SELECT * FROM t_customer WHERE d_customer = '${req.query.customer}' AND d_pwd = '${req.query.pwd}'`
  );
  if (result.recordset.length > 0) {
    res.send("success");
  } else {
    res.send("failed");
  }
});

// 모든 셋탑리스트 (관리자)
app.get("/allSettops", async (req, res) => {
  const result = await db.execute(
    `SELECT * FROM t_riccoboard ORDER BY d_customer ASC, d_datetime DESC`
  );
  if (result.recordset.length > 0) {
    res.send(result.recordset);
  } else {
    res.send("failed");
  }
});

// 고객별 셋탑리스트 (관리자)
app.get("/settopsByCustomer", async (req, res) => {
  const result = await db.execute(
    `SELECT * FROM t_riccoboard WHERE d_customer = '${req.query.customer}' ORDER BY d_datetime DESC`
  );
  if (result.recordset.length > 0) {
    res.send(result.recordset);
  } else {
    res.send("failed");
  }
});

// 셋탑리스트 삭제 (관리자)
app.delete("/deleteSettops", async (req, res) => {
  try {
    req.query.value.forEach(async (idx) => {
      await db.execute(`DELETE FROM t_riccoboard WHERE d_idx = '${idx}'`);
    });
    res.send("success");
  } catch {
    res.send("failed");
  }
});

// 고객정보 리스트 (관리자)
app.get("/customerList", async (req, res) => {
  const result = await db.execute(
    `SELECT * FROM t_customer WHERE d_customer <> 'admin' ORDER BY d_idx DESC`
  );
  if (result.recordset.length > 0) {
    res.send(result.recordset);
  } else {
    res.send("failed");
  }
});

// 고객정보 등록 (관리자)
app.post("/addCustomer", async (req, res) => {
  // 동일한 고객명이 존재하는지 체크한다.
  const result = await db.execute(
    `SELECT * FROM t_customer WHERE d_customer = '${req.body.customer}'`
  );
  if (result.recordset.length > 0) {
    res.send("same");
  } else {
    try {
      const idx = new Date().getTime(); // 현재시간을 밀리초로 변환
      await db.execute(
        `INSERT INTO t_customer(d_idx, d_customer, d_pwd)VALUES('${idx}','${req.body.customer}','${req.body.pwd}')`
      );
      res.send("success");
    } catch {
      res.send("failed");
    }
  }
});

// 고객정보 수정 (관리자)
app.put("/editCustomer", async (req, res) => {
  // 동일한 고객명이 존재하는지 체크한다.
  const result = await db.execute(
    `SELECT * FROM t_customer WHERE d_idx <> '${req.body.idx}' AND d_customer = '${req.body.customer}'`
  );
  if (result.recordset.length > 0) {
    res.send("same");
  } else {
    try {
      await db.execute(
        `UPDATE t_customer SET d_customer = '${req.body.customer}', d_pwd = '${req.body.pwd}' WHERE d_idx = '${req.body.idx}'`
      );
      res.send("success");
    } catch {
      res.send("failed");
    }
  }
});

// 고객정보 삭제 (관리자)
app.delete("/deleteCustomer", async (req, res) => {
  try {
    await db.execute(`DELETE FROM t_customer WHERE d_idx = '${req.query.idx}'`);
    res.send("success");
  } catch {
    res.send("failed");
  }
});

// 셋탑리스트 (사용자)
app.get("/settops/:customer", async (req, res) => {
  const result = await db.execute(
    `SELECT * FROM t_riccoboard WHERE d_customer = '${req.params.customer}' ORDER BY d_datetime DESC`
  );
  if (result.recordset.length > 0) {
    res.send(result.recordset);
  } else {
    res.send("failed");
  }
});

// 비밀번호 변경
app.get("/changeAccount", async (req, res) => {
  let result = null;
  result = await db.execute(
    `SELECT d_pwd FROM t_customer WHERE d_customer = '${req.query.account}' AND d_pwd = '${req.query.pwd}'`
  );
  if (result.recordset.length <= 0) {
    res.send("failed");
    return;
  }

  result = await db.execute(
    `UPDATE t_customer SET d_pwd = '${req.query.pwd2}' WHERE d_customer = '${req.query.account}'`
  );
  if (Number(result.rowsAffected) === 1) {
    res.send("success");
  }
});

app.listen(port, () => {
  console.log("server is started..");
});
