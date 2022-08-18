const { connect } = require("mongoose");
const mysql = require("mysql"); 

const DBCONNECTION = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "fontstyle_chatdb"
});

 
const mongodbConnect = async () => {
  console.log("CONNECTING DATABASE ...");
 await connect(`mongodb://localhost:${process.env.DBPORT}/fontsytle_chatdb`);
}

module.exports = {
  mysqlDbConnect: DBCONNECTION,
  mongodbConnect:mongodbConnect,

};