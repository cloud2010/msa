/**
 * 数据库操作模块
 */
import mongoose from 'mongoose'
import dbConfig from '../config/conn.json'
import { getLogger } from 'log4js'
const logger = getLogger('db')
mongoose.connect(dbConfig.db.conn)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // console.log('数据库msa连接成功')
  logger.info(`数据库链接字符串-${dbConfig.db.conn}`)
  logger.info('数据库msa连接成功')
})

// 构建表模式
const verCheckSchema = new mongoose.Schema(
  {
    name: { type: String },
    timestamp: { type: Number },
    url: { type: String }
  },
  { collection: 'verCheck' }
)

const cargoshipSchema = new mongoose.Schema(
  {
    proName: { type: String },
    proTitle: { type: String },
    part: { type: String },
    proContent: { type: Object }
  },
  { collection: 'cargoship' }
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
    account: { type: String },
    password: { type: String },
    user: { type: String },
    roles: { type: Object }
  },
  { collection: 'loginInfo' }
)
const dbinfoSchema = new mongoose.Schema(
  {
    Number: { type: Number },
    capital: { type: String },
    ChineseName: { type: String },
    classification: { type: String },
    Unnum: { type: String },
    basicInfo: { type: Object },
    property: { type: Object },
    jobRequirements: { type: Object },
    StructuralRequest: { type: Object },
    EquipmentRequest: { type: Object },
    specialRequest: { type: Object }
  },
  { collection: 'dbinfo' }
)
const usersSchema = new mongoose.Schema(
  {
    account: { type: String },
    password: { type: String },
    name: { type: String },
    roles: { type: Object }
  },
  { collection: 'users' }
)

/**
 * 导出表模型
 * ref: https://stackoverflow.com/questions/10547118/why-does-mongoose-always-add-an-s-to-the-end-of-my-collection-name/24464025
 */
const dbutil = {
  cargoship: mongoose.model('Cargoship', cargoshipSchema),
  emergency: mongoose.model('Emergency', emergencySchema),
  loginInfo: mongoose.model('LoginInfo', loginInfoSchema),
  dbInfo: mongoose.model('DBInfo', dbinfoSchema),
  verCheck: mongoose.model('VerCheck', verCheckSchema),
  Users: mongoose.model('Users', usersSchema)
}

const Emergency = mongoose.model('Emergency', emergencySchema)
const Cargoship = mongoose.model('Cargoship', cargoshipSchema)
const LoginInfo = mongoose.model('LoginInfo', loginInfoSchema)
const DBInfo = mongoose.model('DBInfo', dbinfoSchema)
const VerCheck = mongoose.model('VerCheck', verCheckSchema)
const Users = mongoose.model('Users', usersSchema)

export { dbutil, Emergency, Cargoship, LoginInfo, DBInfo, VerCheck, Users }
