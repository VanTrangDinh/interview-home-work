const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    // Add other properties specific to a post
  }),
};

const getPosts = {
  query: Joi.object().keys({
    // sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getPost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      // Add other properties you want to allow for update
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().required().custom(objectId),
  }),
};

const searchPost = {
  body: Joi.object().keys({
    keySearch: Joi.string().required(),
    // limit: Joi.number().integer(),
    // offset: Joi.number().integer(),
  }),
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  searchPost,
};
