import { Sequelize, Options, Op} from 'sequelize'
import pg from 'pg'
import { TaskModel } from "./task";
import { TagsModel } from './tags';
import { StaffModel } from './staff';
import { UserModel } from './users';
import { TaskTagsModel } from './tasktags';


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
  Tag: TagsModel(sequelize, Sequelize.DataTypes),
  Staff: StaffModel(sequelize, Sequelize.DataTypes),
  Users: UserModel(sequelize, Sequelize.DataTypes),
  TaskTags: TaskTagsModel(sequelize, Sequelize.DataTypes)
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})


export default db;