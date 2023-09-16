class Quranic_reflect {
  constructor(quranic_reflects) {
    this.quranic_reflects = quranic_reflects;
  }

  async find() {
    return this.quranic_reflects;
  }

  async findById(id) {
    return this.quranic_reflects.find(
      (quranic_reflect) => quranic_reflect.id === id
    );
  }

  async findByProp(prop) {
    return this.quranic_reflects.find(
      (quranic_reflect) => quranic_reflect[prop] === prop
    );
  }

  async search(term) {
    return this.quranic_reflects.filter((quranic_reflect) =>
      quranic_reflect.title.toLowerCase().includes(term)
    );
  }

  async sort(quranic_reflects, sortType = "asc", sortBy = "updatedAt") {
    let result;
    if (sortType === "asc") {
      result = await this.#sortAsc(quranic_reflects, sortBy);
    } else {
      result = await this.#sortDsc(quranic_reflects, sortBy);
    }
    return result;
  }

  async pagination(quranic_reflects, page, limit) {
    const skip = page * limit - limit;
    const totalItems = quranic_reflects.length;
    const totalPage = Math.ceil(totalItems / limit);
    const result = quranic_reflects.slice(skip, skip + limit);

    return {
      result,
      totalItems,
      totalPage,
      hasNext: page < totalPage,
      hasPrev: page > 1,
    };
  }

  async create(quranic_reflect, databaseConnection) {
    quranic_reflect.id =
      this.quranic_reflects[this.quranic_reflects.length - 1].id + 1;
    quranic_reflect.createdAt = new Date().toISOString();
    quranic_reflect.updatedAt = new Date().toISOString();

    this.quranic_reflects.push(quranic_reflect);
    databaseConnection.db.quranic_reflects = this.quranic_reflects;
    await databaseConnection.write();

    return quranic_reflects;
  }

  async #sortAsc(quranic_reflects, sortBy) {
    return quranic_reflects.sort((a, b) =>
      a[sortBy].toString().localeCompare(b[sortBy].toString())
    );
  }

  async #sortDsc(quranic_reflects, sortBy) {
    return quranic_reflects.sort((a, b) =>
      b[sortBy].toString().localeCompare(a[sortBy].toString())
    );
  }
}

module.exports = Quranic_reflect;
