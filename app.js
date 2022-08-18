const express = require("express");  
const dotenv = require("dotenv");
const { mongodbConnect } = require("./config/db.config");
const { notFound ,errorHandler} = require("./middleware/error.middleware"); 
const authRoute = require("./routes/auth.route");
const chatRoute = require("./routes/chat.route");
const accountRoute = require("./routes/account.route");
const userRoute = require("./routes/user.route");
dotenv.config(); //import env variables
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", authRoute); 
app.use("/api/chat", chatRoute); 
app.use("/api/account", accountRoute); 
app.use("/api/user", userRoute); 

app.use("*", notFound);//not found error handler
app.use(errorHandler);

const start = async () => {
  try {
    await mongodbConnect();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT} ...`);
    });
  } catch (error) {
    console.log(`error: ${error.message}`);
  }
};

start();