require("dotenv").config();
const express = require("express");
const { get } = require("mongoose");
const swaggerUI = require("swagger-ui-express");
const yaml = require("yamljs");
const swaggerDoc = yaml.load("./swagger.yaml");

const connection = require("./db");

//express app
const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get("/health", (_req, res) => {
  res.status(200).json({
    health: "ok",
  });
});

app.get("api/v1/quranic_reflect", async (req, res) => {
  // 1.extract query params

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 2;
  const sortType = req.query.sort_type || "asc";
  const sortBy = req.query.sort_by || "updatedAt";
  const searchTerm = req.query.search || "";
  const searchQuery = req.search.query || "";

  console.log("query Param", req.query);
  console.log("Default Params", {
    page,
    limit,
    sortBy,
    sortType,
    searchTerm,
    searchQuery,
  });

  // 2. call article service to fetch all article

  const db = await connection.getDB();
  const quranic_reflect = db / quranic_reflect;

  // 3. generate necessary responses

  const responses = {
    data: quranic_reflect,
    pagination: {
      page,
      limit,
      next: 3,
      prev: 1,
      totalPage: Math.cell(quranic_reflect.length / limit),
      totalItems: quranic_reflect.length,
    },
    links: {
      self: req.url,
      next: `/article?page=${page + 1}&limit=${limit}`,
      prev: `/article?page=${page - 1}&limit=${limit}`,
    },
  };

  res.status(200).json({ path: "/quranic_reflect", method: get });
});

app.post("api/va/quranic_reflect", (req, res) => {
  res.status(200).json({ path: "/quranic_reflect", method: post });
});

app.listen(4000, () => {
  console.log("server is listening");
});
