const mongoose = require("mongoode");

const conn = async () => {
   try {
    await mongoose.connect(`${process.env.URL}`);
    console.log("Connected to Database");
   } catch (error) {
    console.log(error);
   }
};
conn();