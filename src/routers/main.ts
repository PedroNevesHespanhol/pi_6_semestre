import { Router } from "express";
import * as pingController from "../controllers/ping";
import * as authCotroller from "../controllers/auth";

export const mainRouter = Router();

mainRouter.get('/ping', pingController.ping);
// mainRouter.get('/privatePing');

mainRouter.post('/auth/signup', authCotroller.signup);
// mainRouter.post('/auth/signin');

// mainRouter.post('/post');
// mainRouter.get('/post/:id');
// mainRouter.get('/post/:id/comments');
// mainRouter.post('/post/:id/like'); // toogle, se tem like -> remove, se nao tem like -> add

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