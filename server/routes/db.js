/**
 * 数据库操作模块
 */
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/msa");

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("数据库msa连接成功");
});

// 构建表模式
var cargoshipSchema = new mongoose.Schema(
  {
    timestamp: { type: Number },
    cargoshipInfo: { type: Array }
  },
  { collection: "cargoships" }
);
var emergencySchema = new mongoose.Schema(
  {
    Emergency: { type: Array }
  },
  { collection: "emergency" }
);
var loginInfoSchema = new mongoose.Schema(
  {
    members: { type: Array }
  },
  { collection: "loginInfo" }
);
var dbinfoSchema = new mongoose.Schema(
  {
    DBInfo: { type: Array }
  },
  { collection: "dbInfo" }
);
var verCheckSchema = new mongoose.Schema({
  verCheck: { type: Array }
});

/**
 * 导出表模型
 * ref: https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name/24464025
 */
var dbutil = {
  cargoship: mongoose.model("Cargoship", cargoshipSchema),
  emergency: mongoose.model("Emergency", emergencySchema),
  loginInfo: mongoose.model("LoginInfo", loginInfoSchema),
  dbInfo: mongoose.model("DBInfo", dbinfoSchema)
};
module.exports = dbutil;
