import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://tristan:morlet@localhost:5432/taskdatabase')

try {
    await sequelize.authenticate()
    console.log('Connection Established')
} catch (err) {
    console.error("Connection failed", err)
}

export default sequelize