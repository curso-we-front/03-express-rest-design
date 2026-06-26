const express = require("express");
const router = express.Router();
const { getAll, getOne, create, replace, update, remove } = require("../controllers/articles")
const {validateArticle} = require("../middlewares/validate");

router.get("/articles", getAll);
router.get("/articles/:id", getOne);
router.post("/articles",  validateArticle, create);
router.put("/articles/:id", validateArticle, replace);
router.patch("/articles/:id", validateArticle, update);
router.delete("/articles/:id", remove);

module.exports = router;