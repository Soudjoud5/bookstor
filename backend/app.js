const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user =require("./routes/user");
app.use(express.json());
//routes
app.use("/api/v1",user);
//creatinf port
app.listen(process.env.PORT, () => {
    console.log(`Server Started at port ${process.env.PORT}`);
});