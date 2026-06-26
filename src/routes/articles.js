const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const {
  getAll,
  getOne,
  create,
  remove,
  replace,
  update,
} = require("../controllers/articles");
const { validateArticle, articleRules } = require("../middlewares/validate");

router.get("/articles", getAll);
router.get("/articles/:id", getOne);
router.post("/articles", articleRules, validateArticle, create);
router.delete("/articles/:id", remove);
router.put("/articles/:id", articleRules, validateArticle, replace);
router.patch("/articles/:id", update);

module.exports = router;
