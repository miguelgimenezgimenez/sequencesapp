import request from 'supertest';
import express from 'express';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb'

import availableModels from '../../models';
import { Model } from 'mongoose';
import { IPost } from '../../models/post';
import { IUser } from '../../models/user';
import App from '../../app';
import DIContainer from '../../di/diContainer';
import PostRouter from '../../api/posts/PostRouter';
import UserRouter from '../../api/users/UserRouter';
import DI_TYPES from '../../di/DITypes';
import IDatabase from '../../database/interfaces/IDatabase';


async function createPostRequest(title: string, name: string, content: string, token?: string, file?: string) {

  let req = request(app).post('/api/posts').field("title", title).field('name', name).field("content", content)
  if (file) {
    req.attach('image', file)
  }
  if (token) {
    req = req.set('Authorization', `Bearer ${token}`);
  }

  return req;
}
async function deletePostRequest(cuid: string, token?: string) {
  let req = request(app).delete(`/api/posts/${cuid}`);
  if (token) {
    req = req.set('Authorization', `Bearer ${token}`);
  }
  return req;
}
async function loginUser(email: string, password: string) {
  const response = await request(app).post('/api/users/login').send({ email, password });
  return response.body;
}


async function createPost(title: string, name: string, content: string, userId: ObjectId) {
  const newPost = new Post({ title, name, content, cuid: '1', slug: title, user: userId });
  return newPost.save();
}


async function createUser(email: string, password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: hashedPassword });
  return user.save();
}


let app: express.Application
let Post: Model<IPost>
let User: Model<IUser>
describe('Post Routes', () => {

  beforeAll(async () => {
    app = await new App().config([
      new PostRouter(),
      new UserRouter()
    ]);
    const database = DIContainer.get<IDatabase>(DI_TYPES.Database)
    Post = database.getModel(availableModels.post)
    User = database.getModel(availableModels.user)

  });

  beforeEach(async () => {
    await Post.deleteMany({});
    await User.deleteMany({});
  });
  afterAll(async () => {
    const database = DIContainer.get<IDatabase>(DI_TYPES.Database)
    await database.disconnect()
  })

  describe('Fetching Posts', () => {
    it('should fetch all posts', async () => {
      await createPost('test', 'test', 'test', new ObjectId());
      const response = await request(app).get('/api/posts');
      expect(response.statusCode).toBe(200);
      expect(response.body.posts.length).toBe(1);
      expect(response.body.posts[0].title).toBe('test');
    });

    it('should fetch a single post', async () => {
      const post = await createPost('Single Post', 'test', 'test', new ObjectId());
      const response = await request(app).get(`/api/posts/${post.cuid}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.post.title).toBe('Single Post');
    });

    it('returns 404 when post not found', async () => {
      const response = await request(app).get(`/api/posts/223`);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post Not Found');
    });
  });

  describe('Adding Posts', () => {
    it('should not allow UNAUTHORIZED users to add post', async () => {
      const undefinedToken = undefined
      const response = await createPostRequest('Test', 'miguel', 'This is a test post.', undefinedToken);
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });

    it('Should allow AUTHORIZED users to add post', async () => {
      await createUser('testpost@example.com', 'correctPassword');
      const { accessToken } = await loginUser('testpost@example.com', 'correctPassword');
      const response = await createPostRequest('Test', 'miguel', 'This is a test post.', accessToken);
      expect(response.statusCode).toBe(201);
    });
    it('Should add file to the post', async () => {
      await createUser('testpost@example.com', 'correctPassword');
      const { accessToken } = await loginUser('testpost@example.com', 'correctPassword');
      const response = await createPostRequest('Test', 'miguel', 'This is a test post.', accessToken, 'src/__tests__/logo192.png');

      expect(response.statusCode).toBe(201);
      expect(response.body.post.fileOriginalName).toBe("logo192.png");
      // DELETE FROM CLOUDINARY
      await deletePostRequest(response.body.post.cuid, accessToken);

    });
  });

  describe('Deleting Posts', () => {
    it('should not allow UNAUTHORIZED USERS to delete a post', async () => {
      const undefinedToken = undefined

      const post = await createPost('test', 'UNAUTHORIZED', 'test', new ObjectId());
      const response = await deletePostRequest(post.cuid, undefinedToken);
      expect(response.statusCode).toBe(401);
      expect(response.body.message).toBe("Unauthorized");

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).not.toBeNull();
    });

    it('should not allow Wrong User to delete a post', async () => {
      const post = await createPost('test', 'Wrong User', 'test', new ObjectId());
      await createUser('testpost2@example.com', 'correctPassword');
      const { accessToken } = await loginUser('testpost2@example.com', 'correctPassword');
      const response = await deletePostRequest(post.cuid, accessToken);
      expect(response.statusCode).toBe(403);

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).not.toBeNull();
    });

    it('should allow Post Owner to delete a post', async () => {
      const user = await createUser('test2@example.com', 'correctPassword');
      const post = await createPost('test', 'test', 'test', user._id);
      const { accessToken } = await loginUser('test2@example.com', 'correctPassword');
      const response = await deletePostRequest(post.cuid, accessToken);
      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("1 Post deleted");

      const postInDb = await Post.findOne({ name: post.name }).exec();
      expect(postInDb).toBeNull();
    });

    it('Return 404 when trying to delete an unexisting post', async () => {
      await createUser('test3@example.com', 'correctPassword');
      const { accessToken } = await loginUser('test3@example.com', 'correctPassword');
      const response = await deletePostRequest('3434', accessToken);
      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe('Post Not Found');
    });
  });
});
