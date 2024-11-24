import dotenv from "dotenv";
import {
  Sequelize,
  TimeoutError,
  ConnectionError,
  ConnectionTimedOutError,
} from "sequelize";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";
// Configuration for the reader database
const readerDb = new Sequelize({
  host: process.env.HOST,
  password: process.env.PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  dialect: "mysql",
  logging: isProduction ? false : true,
  retry: {
    match: [
      /DeadLock/i,
      /ER_LOCK_WAIT_TIMEOUT/,
      TimeoutError,
      ConnectionError,
      ConnectionTimedOutError,
    ],
    max: 3,
  },
  pool: {
    max: 80,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: { timestamps: false },
  dialectOptions: { typeCast: true },

  timezone: "+00:00",
});

// Configuration for the writer database
const writerDb = new Sequelize({
  host: process.env.WRITER_HOST,
  password: process.env.PASSWORD,
  username: process.env.DB_USERNAME,
  database: process.env.DATABASE,
  dialect: "mysql",
  logging: isProduction ? false : true,
  retry: {
    match: [
      /DeadLock/i,
      /ER_LOCK_WAIT_TIMEOUT/,
      TimeoutError,
      ConnectionError,
      ConnectionTimedOutError,
    ],
    max: 3,
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: { timestamps: false },
  dialectOptions: { typeCast: true },
  timezone: "+00:00",
});

export { readerDb, writerDb };
