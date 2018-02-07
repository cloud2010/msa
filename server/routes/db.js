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
var cargoshipSchema = new mongoose.Schema({
  timestamp: { type: Number },
  cargoshipInfo: { type: Array }
});

/**
 * 导出表模型
 * mongoose 模型映射会自动在name后面加后缀s
 */
module.exports = mongoose.model("cargoship", cargoshipSchema);
