import express from "express";

import moviesController from "../../controllers/movies-controller.js";

import {authenticate, isEmptyBody, isValidId, upload} from "../../middlewares/index.js";

import {validateBody} from "../../decorators/index.js";

import { movieAddSchema, movieUpdateSchema, movieFavoriteSchema } from "../../models/Movie.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", moviesController.getAll);

moviesRouter.get("/:id", isValidId, moviesController.getById);

// upload.fields([{name: "poster", maxCount: 1}])
// upload.array("poster", 8)
moviesRouter.post("/", upload.single("poster"), isEmptyBody, validateBody(movieAddSchema), moviesController.add);

moviesRouter.put("/:id", isValidId, isEmptyBody, validateBody(movieUpdateSchema), moviesController.updateById);

moviesRouter.patch("/:id/favorite", isValidId, isEmptyBody, validateBody(movieFavoriteSchema), moviesController.updateById);

moviesRouter.delete("/:id", isValidId, moviesController.deleteById);

export default moviesRouter;