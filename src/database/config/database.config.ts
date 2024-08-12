import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import pg from 'pg';


dotenv.config();

const dburl: string = process.env.DEV_DATABASE_URL || "";
console.log("harahiye", dburl);

if (!dburl) {
  throw new Error("DEV_DATABASE_URL is not defined in your environment variables.");

}

let dialect_option: any;
export const sequelizeConnection: Sequelize = new Sequelize(dburl, {
  dialect: "postgres",
  dialectOptions: dialect_option,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const connectToDatabase = async () => {
  const databaseConnection = new Sequelize(dburl, {
    dialect: 'postgres',
    dialectModule: pg,
  });

  try {
    await databaseConnection.authenticate();
    console.log('Connection has been established successfully.');
    return databaseConnection;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err;
  }
};

export default connectToDatabase;
