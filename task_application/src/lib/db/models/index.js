import { Sequelize, Options, Op} from 'sequelize'
import pg from 'pg'
import { TaskModel } from "./task";
import { TagsModel } from './tags';


function makeConfig() {
  const isDev = process.env.NODE_ENV !== 'production'

  const config = {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    dialect: 'postgres',
    dialectModule: pg,
  };

  if (!isDev) {
    config.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    }
  }

  return config
}

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  makeConfig()
)


const db = {
  sequelize,
  Sequelize,
  Task: TaskModel(sequelize, Sequelize.DataTypes),
  Tag: TagsModel(sequelize, Sequelize.DataTypes)
}


export default db;