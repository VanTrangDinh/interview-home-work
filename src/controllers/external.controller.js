const { NotFoundError } = require('../core/error.response');
const ExternalService = require('../services/external.service');
const { SuccessResponse } = require('../core/success.response');
const externalService = new ExternalService('https://jsonplaceholder.typicode.com');

class ExternalApiController {
  getPosts = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query;
    new SuccessResponse({
      message: 'Get posts successfully',
      metadata: await externalService.get('posts', { _page: page, _limit: limit }),
    }).send(res);
  };

  getPostById = async (req, res) => {
    const postId = req.params.id;
    new SuccessResponse({
      message: 'Create post successfully',
      metadata: await externalService.get(`posts/${postId}`),
    }).send(res, 201);
  };

  getPostComments = async (req, res) => {
    const postId = req.params.id;
    new SuccessResponse({
      message: 'Get post comments successfully',
      metadata: await externalService.get(`posts/${postId}/comments`),
    }).send(res);
  };

  getCommentsByPostId = async (req, res) => {
    const postId = req.query.postId;
    new SuccessResponse({
      message: 'Get comments by post ID successfully',
      metadata: await externalService.get('comments', { postId }),
    }).send(res);
  };

  createPost = async (req, res) => {
    new SuccessResponse({
      message: 'Create post successfully',
      metadata: await externalService.post('posts', req.body),
    }).send(res, 201);
  };

  updatePost = async (req, res) => {
    const postId = req.params.id;
    new SuccessResponse({
      message: 'Update post successfully',
      metadata: await externalService.put(`posts/${postId}`, req.body),
    }).send(res);
  };

  partiallyUpdatePost = async (req, res) => {
    const postId = req.params.id;
    new SuccessResponse({
      message: 'Partially update post successfully',
      metadata: await externalService.patch(`posts/${postId}`, req.body),
    }).send(res);
  };

  deletePost = async (req, res) => {
    const postId = req.params.id;
    await externalService.delete(`posts/${postId}`);
    res.sendStatus(204);
  };

  //   static async getPostComments(req, res) {
  //     const postId = req.params.id;
  //     try {
  //       const comments = await externalService.get(`posts/${postId}/comments`);
  //       res.json(comments);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  //   static async getCommentsByPostId(req, res) {
  //     const postId = req.query.postId;
  //     try {
  //       const comments = await externalService.get('comments', { postId });
  //       res.json(comments);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  //   static async createPost(req, res) {
  //     try {
  //       const response = await externalService.post('posts', req.body);
  //       res.status(201).json(response);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  //   static async updatePost(req, res) {
  //     const postId = req.params.id;
  //     try {
  //       const response = await externalService.put(`posts/${postId}`, req.body);
  //       res.json(response);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  //   static async partiallyUpdatePost(req, res) {
  //     const postId = req.params.id;
  //     try {
  //       const response = await externalService.patch(`posts/${postId}`, req.body);
  //       res.json(response);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }

  //   static async deletePost(req, res) {
  //     const postId = req.params.id;
  //     try {
  //       await externalService.delete(`posts/${postId}`);
  //       res.sendStatus(204);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     }
  //   }
}

module.exports = new ExternalApiController();
