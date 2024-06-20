require("dotenv").config();
const sql = require("mssql");

const config = `Server=${process.env.DB_SERVER},1433;Database=${process.env.DB_DATABASE};User Id=${process.env.DB_USERID};Password=${process.env.DB_PASSWORD};Encrypt=false`;

const execute = (query) => {
  return new Promise(async (resolve, reject) => {
    await sql.connect(config).catch((err) => reject(err));
    const rows = await sql.query(query).catch((err) => {
      reject(err);
      sql.close();
    });
    resolve(rows);
    sql.close();
  });
};
module.exports = { execute };