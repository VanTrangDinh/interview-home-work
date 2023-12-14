'use strict';

const { createPost, getPosts, getPostById, updatePost, deletePost, searchPostByKeys } = require('../services/post.service');
const { SuccessResponse } = require('../core/success.response');

class PostController {
  searchPost = async (req, res, next) => {
    new SuccessResponse({
      message: 'Search post successfully',
      metadata: await searchPostByKeys(req.body),
    }).send(res);
  };
  createPost = async (req, res, next) => {
    new SuccessResponse({
      message: 'A new post was successfully created.',
      metadata: await createPost(req.body, req.user._id),
    }).send(res);
  };

  getPosts = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get posts successfully',
      metadata: await getPosts(req.query),
    }).send(res);
  };

  getPostById = async (req, res, next) => {
    new SuccessResponse({
      message: 'Get post by id successfully',
      metadata: await getPostById(req.params.postId),
    }).send(res);
  };

  updatePost = async (req, res, next) => {
    new SuccessResponse({
      message: 'Post updated successfully',
      metadata: await updatePost({
        postId: req.params.postId,
        userId: req.user._id,
        title: req.body.title,
        content: req.body.content,
      }),
    }).send(res);
  };

  deletePost = async (req, res, next) => {
    new SuccessResponse({
      message: 'Post deleted successfully.',
      metadata: await deletePost(req.params.postId, req.user._id),
    }).send(res);
  };
}

module.exports = new PostController();
