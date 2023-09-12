const { json } = require("express");
const fs = require("fs/promises");
const path = require("path");

class DatabaseConnection {
  constructor(dbURL) {
    this.db = null;
    this.dbURL = dbURL;
  }

  async read() {
    const dbStr = await fs.readFile(this.dbURL, { encoding: "utf-8" });
    this.db = JSON.parse(dbStr);
  }
  async write() {
    if (this.db) {
      this.db = await fs.writeFile(this.dbURL, JSON.stringify(this.db));
    }
  }

  async getDB() {
    if (this.db) {
      return this.db;
    }
    await this.read();
    return this.db;
  }
}

// DB CONNECTION
// const main = async () => {
//   const dbConnection = new DatabaseConnection();
//   const db = await dbConnection.getDB();

//   db.users.push("Adullah");
//   db.users.push("Abdur Rahman");
//   dbConnection.write();

//   console.log("Database");
//   console.log(db);
// };

// main();
// console.log(process.env.DB_URL);
// console.log(path.resolve(process.env.DB_URL));

const connection = new DatabaseConnection(path.resolve(process.env.DB_URL));

module.exports = connection;
