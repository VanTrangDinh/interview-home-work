const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    userId: Joi.number().integer().required(),
  }),
};

const getPosts = {
  query: Joi.object().keys({
    // sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    id: Joi.string().required() /* .custom(objectId), */,
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
  }),
};

const partiallyUpdatePost = {
  params: Joi.object().keys({
    id: Joi.string().required() /* .custom(objectId), */,
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
  }),
};

const deletePost = {
  params: Joi.object().keys({
    id: Joi.string().required() /* .custom(objectId), */,
  }),
};

const getCommentsByPostId = {
  params: Joi.object().keys({
    id: Joi.string().required() /* custom(objectId) */, // Assuming :id in /posts/:id/comments
  }),
};

const getCommentsByQuery = {
  query: Joi.object().keys({
    postId: Joi.string().required() /* .custom(objectId), */,
  }),
};

const getPostById = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  createPost,
  getPosts,
  updatePost,
  partiallyUpdatePost,
  deletePost,
  getCommentsByPostId,
  getCommentsByQuery,
  getPostById,
};
