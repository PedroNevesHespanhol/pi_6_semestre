import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authCotroller from "../controllers/auth";
import * as postController from "../controllers/post";
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
mainRouter.get('/privatePing', verifyJWT, pingController.privatePing);

mainRouter.post('/auth/signup', authCotroller.signup);
mainRouter.post('/auth/signin', authCotroller.signin);

mainRouter.post('/post', verifyJWT, postController.addPost);
mainRouter.get('/post/:id', verifyJWT, postController.getPost);
mainRouter.get('/post/:id/comment', verifyJWT, postController.getComments);
mainRouter.post('/post/:id/like', verifyJWT, postController.likeToggle); // toggle, se tem like -> remove, se nao tem like -> add

// mainRouter.get('/user/:slug');
// mainRouter.get('/user/:slug/posts');
// mainRouter.post('/user/:slug/follow');
// mainRouter.put('/user');
// mainRouter.put('/user/avatar');
// mainRouter.put('/user/cover');

// mainRouter.get('/feed');
// mainRouter.get('/search');
// mainRouter.get('/trending');
// mainRouter.get('/suggestions');