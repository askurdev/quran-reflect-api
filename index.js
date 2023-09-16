require("dotenv").config();
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDoc = YAML.load("./swagger.yaml");
const OpenApiValidator = require("express-openapi-validator");

const databaseConnection = require("./db");
const quranic_reflectService = require("./services/quranic_reflect");

// express app
const app = express();
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./swagger.yaml",
  })
);

app.use((req, _res, next) => {
  req.user = {
    id: 101,
    name: "askur",
  };
  next();
});

app.get("/health", (_req, res) => {
  res.status(200).json({
    health: "OK",
  });
});

app.get("/api/v1/quranic_reflects", async (req, res) => {
  // 1. extract query params
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const sortType = req.query.sort_type || "asc";
  const sortBy = req.query.sort_by || "updatedAt";
  const searchTerm = req.query.searchTerm || "";

  // 2. call  to fetch all quranic_reflects
  let { totalItems, totalPage, hasNext, hasPrev, quranic_reflects } =
    await quranic_reflectService.findQuranic_reflects({
      page,
      limit,
      sortType,
      sortBy,
      searchTerm,
    });

  const response = {
    data: quranic_reflectService.transformQuranic_reflects({
      quranic_reflects,
    }),
    pagination: {
      page,
      limit,
      totalPage,
      totalItems,
    },
    links: {
      self: req.url,
    },
  };

  if (hasPrev) {
    response.pagination.prev = page - 1;
    response.links.prev = `${req.url}?page=${page - 1}&limit=${limit}`;
  }

  if (hasNext) {
    response.pagination.next = page + 1;
    response.links.next = `${req.url}?page=${page + 1}&limit=${limit}`;
  }

  // 3. generate necessary responses
  res.status(200).json(response);
});

app.post("/api/v1/quranic_reflects", async (req, res) => {
  // step 1: destructure the request body
  const { title, body, cover, status } = req.body;

  // step 2: invoke the service function
  const quranic_reflect = await quranic_reflectService.createQuranic_reflect({
    title,
    body,
    cover,
    status,
    authorId: req.user.id,
  });

  // step 3: generate response
  const response = {
    code: 201,
    message: "Quranic_reflect created successfully",
    data: quranic_reflect,
    links: {
      self: `${req.url}/${quranic_reflect.id}`,
      author: `${req.url}/${quranic_reflect.id}/author`,
    },
  };
  res.status(201).json(response);
});

app.get("/api/v1/quranic_reflects/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `/quranic_reflects/${req.params.id}`, method: "get" });
});

app.put("/api/v1/quranic_reflects/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `quranic_reflects/${req.params.id}`, method: "put" });
});

app.patch("/api/v1/quranic_reflects/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `/quranic_reflects/${req.params.id}`, method: "patch" });
});

app.delete("/api/v1/quranic_reflects/:id", (req, res) => {
  res
    .status(200)
    .json({ path: `/quranic_reflects/${req.params.id}`, method: "delete" });
});

app.post("/api/v1/auth/signup", (req, res) => {
  res.status(200).json({ path: "/auth/signup", method: "post" });
});

app.post("/api/v1/auth/signin", (req, res) => {
  res.status(200).json({ path: "/auth/signin", method: "post" });
});

app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

(async () => {
  await databaseConnection.connect();
  console.log("Database Connected");

  app.listen(4000, () => {
    console.log("Server is listening on port 4000");
  });
})();
