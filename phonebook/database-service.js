import { Sequelize, DataTypes } from "sequelize";
import process, { env } from "node:process";

const db = env.NODEAPP_DB || "db";
const dbUser = env.NODEAPP_USER || "user1";
const dbPass = env.NODEAPP_PASS || "pass1";
const dbHost = env.NODEAPP_HOST || "localhost";
const dbDialect = env.NODEAPP_DIALECT || "mysql"; // 'postgres'

export default class DatabaseService {
  sequelize = new Sequelize(db, dbUser, dbPass, {
    host: dbHost,
    dialect: dbDialect,
  });

  Contact = this.sequelize.define(
    "Contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
    }
  );

  User = this.sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
    }
  );

  constructor() {
    process.on("SIGINT", async () => {
      try {
        await this.sequelize.close();
        console.log("Disconnect from DB Success");
        process.exit(0);
      } catch (e) {
        console.log("Disconnect from DB Error", e);
        process.exit(1);
      }
    });

    this.sequelize
      .authenticate()
      .then(async () => {
        console.log("Connection has been established successfully.");
        await this.sequelize.sync();
      })
      .catch((error) => {
        console.error("Sequelize Error:", error);
      });
  }

  async createUser(data) {
    return await this.User.create({ userName: data.userName, password: data.password });
  }

  async getUserByName(userName) {
    return await this.User.findOne({ where: { userName } });
  }

  async getCurrentUser(id) {
    return await this.User.findOne({ where: { id } });
  }

  async getAll() {
    return await this.Contact.findAll();
  }

  async getOne(id) {
    return await this.Contact.findOne({ where: { id } });
  }

  async create(data) {
    return await this.Contact.create({ name: data.name, phone: data.phone, userId: data.userId });
  }

  async update(id, data) {
    return await this.Contact.update(data, { where: { id } });
  }

  async delete(id) {
    return await this.Contact.destroy({ where: { id } });
  }
}
