const Quranic_reflect = require("../models/Quranic_reflect");
const databaseConnection = require("../db");

const findQuranic_reflects = async ({
  page = 1,
  limit = 5,
  sortType = "asc",
  sortBy = "updatedAt",
  searchTerm = "",
}) => {
  const quranic_reflectInstance = new Quranic_reflect(
    databaseConnection.db.quranic_reflects
  );
  let quranic_reflects;

  // filter based on search term
  if (searchTerm) {
    quranic_reflects = await quranic_reflectInstance.search(searchTerm);
  } else {
    quranic_reflects = await quranic_reflectInstance.find();
  }

  // sorting
  quranic_reflects = [...quranic_reflects];
  quranic_reflects = await quranic_reflectInstance.sort(
    quranic_reflects,
    sortType,
    sortBy
  );

  // pagination
  const { result, totalItems, totalPage, hasNext, hasPrev } =
    await quranic_reflectInstance.pagination(quranic_reflects, page, limit);

  return {
    totalItems,
    totalPage,
    hasNext,
    hasPrev,
    articles: result,
  };
};

const transformQuranic_reflects = ({ quranic_reflects = [] }) => {
  return quranic_reflects.map((quranic_reflect) => {
    const transformed = { ...quranic_reflect };
    transformed.author = {
      id: transformed.authorId,
      // TODO: find author name - authorService
    };
    transformed.link = `/quranic_reflects/${transformed.id}`;
    delete transformed.body;
    delete transformed.authorId;

    return transformed;
  });
};

const createQuranic_reflect = async ({
  title,
  body,
  authorId,
  cover = "",
  status = "draft",
}) => {
  const quranic_reflectInstance = new Quranic_reflect(
    databaseConnection.db.quranic_reflects
  );
  const quranic_reflect = await quranic_reflectInstance.create(
    { title, body, authorId, cover, status },
    databaseConnection
  );
  return quranic_reflect;
};

module.exports = {
  findQuranic_reflects,
  transformQuranic_reflects,
  createQuranic_reflect,
};
