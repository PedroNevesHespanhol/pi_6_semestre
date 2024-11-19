import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authCotroller from "../controllers/auth";
import * as postController from "../controllers/post";
import { verifyJWT } from "../utils/jwt";
import * as userController from "../controllers/user";
import * as feedController from "../controllers/feed";
import * as searchController from "../controllers/search";
import * as trendController from "../controllers/trend";
import * as suggestionsController from "../controllers/suggestion"
import { uploadMulter } from "../utils/uploadMulter";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/privatePing', verifyJWT, pingController.privatePing);

mainRouter.post('/signup', authCotroller.signup);
mainRouter.post('/signin', authCotroller.signin);

mainRouter.post('/post', verifyJWT, postController.addPost);
mainRouter.get('/post/:id', verifyJWT, postController.getPost);
mainRouter.get('/post/:id/comment', verifyJWT, postController.getComments);
mainRouter.post('/post/:id/like', verifyJWT, postController.likeToggle); // toggle, se tem like -> remove, se nao tem like -> add

mainRouter.get('/user/:slug', verifyJWT, userController.getUser);
mainRouter.get('/user/:slug/posts', verifyJWT, userController.getUserPosts);
mainRouter.post('/user/:slug/follow', verifyJWT, userController.followToggle);
mainRouter.put('/user', verifyJWT, userController.updateUser);
mainRouter.put('/user/avatar', verifyJWT, uploadMulter, userController.uploadAvatar);
mainRouter.put('/user/cover', verifyJWT, uploadMulter, userController.uploadCover);

mainRouter.get('/feed', verifyJWT, feedController.getFeed);
mainRouter.get('/search', verifyJWT, searchController.searchPosts);
mainRouter.get('/trending', verifyJWT, trendController.getTrends);
mainRouter.get('/suggestions', verifyJWT, suggestionsController.getSuggestions);