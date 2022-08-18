const {  mysqlDbConnect } = require("../config/db.config");

exports.contactExist = (contact) => {
  
  let check = false;
    const query = "SELECT * FROM account WHERE Contact =(?)";
    mysqlDbConnect.query(query, [contact], (err, result) => {
      if (err) {
        console.log(`validation err: ${err.sqlMessage}`);
      }
      if (!result)
        check= true;
    });
  return check;
};

 