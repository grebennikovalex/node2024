import { cwd } from "node:process";
import { join } from "node:path";
import { existsSync, writeFileSync, readFileSync } from "node:fs";

export default class DatabaseService {
  database = [];
  filePath = join(cwd(), ".", "dz03_database.json");

  constructor() {
    if (existsSync(this.filePath)) {
      try {
        this.database = JSON.parse(readFileSync(this.filePath));
      } catch (e) {
        console.error("DATABASE ERROR", e);
      }
    } else {
      writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  getAll() {
    return this.database;
  }

  getOne(id) {
    const found = this.database.find((item) => {
      return item.id === id;
    });
    return found;
  }

  create(data) {
    try {
      this.database.push(data);
      this.storeToDisk();
      return true;
    } catch (e) {
      console.error("DATABASE ERROR", e);
      return false;
    }
  }

  update(id, data) {
    const found = this.database.find((item) => {
      return item.id === id;
    });
    const foundElIdx = this.database.indexOf(found);
    try {
      this.database[foundElIdx] = data;
      this.storeToDisk();
      return true;
    } catch (e) {
      console.error("DATABASE ERROR", e);
      return false;
    }
  }

  delete(id) {
    try {
      this.database = this.database.filter((item) => {
        return item.id !== id;
      });
      this.storeToDisk();
      return true;
    } catch (e) {
      console.error("DATABASE ERROR", e);
      return false;
    }
  }

  storeToDisk() {
    try {
      writeFileSync(this.filePath, JSON.stringify(this.database));
    } catch (e) {
      console.error("DATABASE ERROR", e);
    }
  }
}
