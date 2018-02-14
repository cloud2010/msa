/**
 * 数据库操作模块
 */
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost:27017/msa')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('数据库msa连接成功')
})

// 构建表模式
const cargoshipSchema = new mongoose.Schema(
  {
    timestamp: { type: Number },
    isPublished: { type: Boolean },
    cargoshipInfo: { type: Array }
  },
  { collection: 'cargoships' }
)
const emergencySchema = new mongoose.Schema(
  {
    Number: { type: Number },
    capital: { type: String },
    ChineseName: { type: String },
    extinguishing: { type: String },
    oilfence: { type: String },
    PersonalProtection: { type: String },
    skinExposure: { type: String },
    eyeExposure: { type: String },
    inhalation: { type: String },
    ingestion: { type: String }
  },
  { collection: 'emergency' }
)
const loginInfoSchema = new mongoose.Schema(
  {
    timestamp: { type: Number },
    isPublished: { type: Boolean },
    members: { type: Array }
  },
  { collection: 'loginInfo' }
)
const dbinfoSchema = new mongoose.Schema(
  {
    timestamp: { type: Number },
    isPublished: { type: Boolean },
    DBInfo: { type: Array }
  },
  { collection: 'dbInfo' }
)
const verCheckSchema = new mongoose.Schema({
  verCheck: { type: Array }
})

/**
 * 导出表模型
 * ref: https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name/24464025
 */
const dbutil = {
  cargoship: mongoose.model('Cargoship', cargoshipSchema),
  emergency: mongoose.model('Emergency', emergencySchema),
  loginInfo: mongoose.model('LoginInfo', loginInfoSchema),
  dbInfo: mongoose.model('DBInfo', dbinfoSchema)
}

export default dbutil
